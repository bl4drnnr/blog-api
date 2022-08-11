import { Controller, Get, Response } from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { TokensDto } from '../dto/token/tokens.dto';
import { Cookie } from '../decorator/cookie.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Resource allows user to refresh token.' })
  @ApiResponse({ status: 200, type: TokensDto })
  @Get('/refresh')
  async refreshToken(
    @Response() res: ExpressResponse,
    @Cookie('_rt') refreshToken: string
  ): Promise<string> {
    const { _at, _rt } = await this.authService.refreshToken(refreshToken);

    res.cookie('_rt', _rt, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return _at;
  }
}
