import { Controller, Get, Headers } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Resource allows user to refresh token.' })
  @ApiResponse({ status: 200 })
  @Get()
  refreshToken(@Headers('_rt') _rt: string) {
    return this.authService.refreshToken(_rt);
  }
}
