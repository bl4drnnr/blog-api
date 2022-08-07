import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Resource allows user to refresh token' })
  @ApiResponse({ status: 200 })
  @Get()
  refreshToken() {
    // return this.authService.refreshToken();
  }
}
