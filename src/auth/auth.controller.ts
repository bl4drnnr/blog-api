import { Controller, Get, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { TokensDto } from '../dto/token/tokens.dto';
import { Cookie } from '../decorator/cookie.decorator';
import { FastifyReply } from 'fastify';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Resource allows user to refresh token.' })
  @ApiResponse({ status: 200, type: TokensDto })
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
