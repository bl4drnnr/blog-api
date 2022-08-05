import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpUserDto } from '../dto/user/sign-up-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInUserDto } from '../dto/user/sign-in-user.dto';

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
}
