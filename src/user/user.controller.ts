import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from '../dto/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Resource for sign in user' })
  @ApiResponse({ status: 200 })
  @Post('/sign-in')
  signIn(@Body() userDto: UserDto) {
    return this.userService.signIn(userDto);
  }

  @ApiOperation({ summary: 'Resource for sign up user' })
  @ApiResponse({ status: 200 })
  @Post('/sign-up')
  signUp(@Body() userDto: UserDto) {
    return this.userService.signUp(userDto);
  }
}
