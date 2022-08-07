import { Controller, Get, Request } from '@nestjs/common';
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
  refreshToken(@Request() req): Promise<TokensDto> {
    return this.authService.refreshToken(req.cookies['_rt']);
  }
}
