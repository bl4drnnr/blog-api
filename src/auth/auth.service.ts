import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Session } from '../models/session.model';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../shared/config.service';
import { AccessTokenDto } from "./dto/access-token.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";

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

  verifyToken() {
    //
  }

  private generateAccessToken(accessTokenDto: AccessTokenDto) {
    return accessTokenDto;
  }

  private generateRefreshToken() {
    return null;
  }

  private async updateRefreshToken(refreshTokenDto: RefreshTokenDto) {
    await this.sessionRepository.destroy({
      where: { userId: refreshTokenDto.userId }
    });
    return await this.sessionRepository.create(refreshTokenDto);
  }
}
