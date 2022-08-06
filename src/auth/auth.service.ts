import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Session } from '../models/session.model';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../shared/config.service';
import { AccessTokenDto } from '../dto/token/access-token.dto';
import { RefreshTokenDto } from '../dto/token/refresh-token.dto';
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

  async refreshToken() {
    //
  }

  async deleteRefreshToken() {
    // delete by user id
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

  //   refreshToken: async ({ _rt }, { transaction } = { transaction: null }) => {
  //   const payload = jwtService.verifyToken({ token: _rt })
  //
  //   if (payload.type !== 'refresh') throw ApiError.UnauthorizedError()
  //
  //   const token = await jwtService.getTokenByTokenId({ tokenId: payload.id }, { transaction })
  //
  //   if (!token) throw ApiError.UnauthorizedError()
  //
  //   const user = await userRepository.getUser({
  //     id: cryptoService.decrypt(token.userId)
  //   }, { transaction })
  //
  //   const tokens = await jwtService.updateTokens({
  //     userId: cryptoService.decrypt(token.userId),
  //     username: user.username,
  //     personalId: user.personalId,
  //     reputation: user.reputation
  //   }, { transaction })
  //
  //   return { _at: tokens.accessToken, _rt: tokens.refreshToken }
  // },
}
