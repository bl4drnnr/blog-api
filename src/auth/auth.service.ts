import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Session } from '../models/session.model';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../shared/config.service';
import { AccessTokenDto } from './dto/access-token.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import * as uuid from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Session) private sessionRepository: typeof Session,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  getTokenById() {
    //
  }

  async updateTokens(accessTokenDto: AccessTokenDto) {
    const accessToken = this.generateAccessToken(accessTokenDto);
    const refreshToken = this.generateRefreshToken();

    await this.updateRefreshToken({
      userId: accessTokenDto.userId,
      tokenId: refreshToken.id
    });

    return { accessToken, refreshToken: refreshToken.token };
  }

  deleteRefreshToken() {
    //
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token, {
      secret: this.configService.jwtAuthConfig.secret
    });
  }

  private generateAccessToken(accessTokenDto: AccessTokenDto) {
    const payload = {
      userId: accessTokenDto.userId,
      username: accessTokenDto.username,
      type: 'access'
    };
    const options = {
      expiresIn: this.configService.jwtAuthConfig.accessExpiresIn,
      secret: this.configService.jwtAuthConfig.secret
    };

    return this.jwtService.sign(payload, options);
  }

  private generateRefreshToken() {
    const id = uuid.v4();
    const payload = {
      id,
      type: 'refresh'
    };
    const options = {
      expiresIn: this.configService.jwtAuthConfig.refreshExpiresIn,
      secret: this.configService.jwtAuthConfig.secret
    };

    return { id, token: this.jwtService.sign(payload, options) };
  }

  private async updateRefreshToken(refreshTokenDto: RefreshTokenDto) {
    await this.sessionRepository.destroy({
      where: { userId: refreshTokenDto.userId }
    });
    return await this.sessionRepository.create(refreshTokenDto);
  }
}
