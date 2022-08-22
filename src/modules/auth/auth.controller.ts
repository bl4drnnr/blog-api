import { Controller, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Cookie } from '@decorators/cookie.decorator';
import { FastifyReply } from 'fastify';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RefreshTokenResponse } from '@modules/auth/dto/refresh-token/response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Resource for refreshing token' })
  @ApiResponse({ status: 200, type: String })
  @Get('/refresh')
  async refreshToken(
    @Res({ passthrough: true }) res: FastifyReply,
    @Cookie('_rt') refreshToken: string
  ) {
    const { _at, _rt } = await this.authService.refreshToken(refreshToken);

    res.cookie('_rt', _rt);

    return new RefreshTokenResponse(_at);
  }
}
