import { Controller, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Cookie } from '../../decorator/cookie.decorator';
import { FastifyReply } from 'fastify';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/refresh')
  async refreshToken(
    @Res({ passthrough: true }) res: FastifyReply,
    @Cookie('_rt') refreshToken: string
  ): Promise<string> {
    const { _at, _rt } = await this.authService.refreshToken(refreshToken);

    res.cookie('_rt', _rt);

    return res.send(_at);
  }
}
