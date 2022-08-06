import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpUserDto } from '../dto/user/sign-up-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInUserDto } from '../dto/user/sign-in-user.dto';
import { Roles } from '../decorator/role.decorator';
import { RoleGuard } from '../guard/role.guard';
import { AuthGuard } from '../guard/auth.guard';
import { User } from '../decorator/user.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Resource for sign in user' })
  @ApiResponse({ status: 200 })
  @Post('/sign-in')
  signIn(@Body() signInUserDto: SignInUserDto) {
    return this.userService.signIn(signInUserDto);
  }

  @ApiOperation({ summary: 'Resource for sign up user' })
  @ApiResponse({ status: 200 })
  @Post('/sign-up')
  signUp(@Body() signUpUserDto: SignUpUserDto) {
    return this.userService.signUp(signUpUserDto);
  }

  @ApiOperation({ summary: 'Resource for user logout' })
  @ApiResponse({ status: 200 })
  @UseGuards(AuthGuard)
  @Post('/logout')
  logout(@User() user) {
    return this.userService.logout(user);
  }

  @ApiOperation({ summary: 'Get all users. Allowed only for ADMIN role' })
  @ApiResponse({ status: 200 })
  @UseGuards(RoleGuard, AuthGuard)
  @Roles('ADMIN')
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }
}
