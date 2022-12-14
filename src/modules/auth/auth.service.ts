import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Session } from '@models/session.model';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@shared/config.service';
import { UserService } from '../user/user.service';
import * as uuid from 'uuid';
import * as jwt from 'jsonwebtoken';
import { IRefreshToken } from '@interface/refresh-token.interface';
import { IAccessToken } from '@interface/access-token.interface';

interface ITokenPayload {
  id: string;
  type: string;
  userId: string;
}

interface ITokenError {
  message: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Session) private sessionRepository: typeof Session,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async getTokenById(tokenId: string) {
    return await this.sessionRepository.findOne({ where: { tokenId } });
  }

  async updateTokens(accessTokenDto: IAccessToken) {
    const accessToken = this.generateAccessToken(accessTokenDto);
    const refreshToken = this.generateRefreshToken();

    await this.updateRefreshToken({
      userId: accessTokenDto.userId,
      tokenId: refreshToken.id
    });

    return { _at: accessToken, _rt: refreshToken.token };
  }

  async refreshToken(tokenRefresh: string) {
    if (!tokenRefresh)
      throw new UnauthorizedException({ message: 'unauthorized' });

    const payload: ITokenPayload | ITokenError = this.verifyToken(tokenRefresh);

    if (!('type' in payload))
      throw new UnauthorizedException({ message: 'unauthorized' });

    const token = await this.getTokenById(payload.id);

    if (!token) throw new UnauthorizedException({ message: 'unauthorized' });

    const user = await this.userService.getUser({ id: token.userId });

    return await this.updateTokens({
      userId: user.id,
      username: user.username,
      roles: user.roles
    });
  }

  async deleteRefreshToken(userId: string) {
    return await this.sessionRepository.destroy({ where: { userId } });
  }

  verifyToken<T extends ITokenPayload, R extends ITokenError>(
    token: string
  ): T | R {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.jwtAuthConfig.secret
      });
    } catch (e: any) {
      if (e instanceof jwt.TokenExpiredError)
        return <R>{ message: 'token-expired' };
      else if (e instanceof jwt.JsonWebTokenError)
        return <R>{ message: 'invalid-token' };
    }
  }

  private generateAccessToken(accessTokenDto: IAccessToken) {
    const payload = {
      userId: accessTokenDto.userId,
      username: accessTokenDto.username,
      roles: accessTokenDto.roles,
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
    const payload = { id, type: 'refresh' };
    const options = {
      expiresIn: this.configService.jwtAuthConfig.refreshExpiresIn,
      secret: this.configService.jwtAuthConfig.secret
    };

    return { id, token: this.jwtService.sign(payload, options) };
  }

  private async updateRefreshToken(refreshTokenDto: IRefreshToken) {
    await this.sessionRepository.destroy({
      where: { userId: refreshTokenDto.userId }
    });
    return await this.sessionRepository.create(refreshTokenDto);
  }
}
