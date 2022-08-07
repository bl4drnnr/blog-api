import { Controller, Get, Request, Response } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { TokensDto } from '../dto/token/tokens.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Resource allows user to refresh token.' })
  @ApiResponse({ status: 200, type: TokensDto })
  @Get('/refresh')
  async refreshToken(@Request() req, @Response() res): Promise<string> {
    const { _at, _rt } = await this.authService.refreshToken(
      req.cookies['_rt']
    );

    res.cookie('_at', _at, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({ _rt });
  }
}
