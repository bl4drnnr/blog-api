import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from '../dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/sign-in')
  signIn(@Body() userDto: UserDto) {
    return this.userService.signIn(userDto);
  }

  @Post('/sign-up')
  signUp(@Body() userDto: UserDto) {
    return this.userService.signUp(userDto);
  }
}
