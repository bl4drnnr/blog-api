import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Response
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpUserDto } from '../dto/user/sign-up-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInUserDto } from '../dto/user/sign-in-user.dto';
import { Roles } from '../decorator/role.decorator';
import { RoleGuard } from '../guard/role.guard';
import { AuthGuard } from '../guard/auth.guard';
import { User } from '../models/user.model';
import { BanUserDto } from '../dto/user/ban-user.dto';
import { UserBan } from '../models/user-ban.model';
import { User as UserDecorator } from '../decorator/user.decorator';
import { TokensDto } from '../dto/token/tokens.dto';
import { Response as Res } from 'express';
import * as dayjs from 'dayjs';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Resource for sign in user.' })
  @ApiResponse({ status: 200, type: TokensDto })
  @Post('/sign-in')
  async signIn(@Body() signInUserDto: SignInUserDto, @Response() res: Res) {
    const { _at, _rt } = await this.userService.signIn(signInUserDto);

    res.cookie('_rt', _rt, {
      httpOnly: true,
      expires: dayjs().add(7, 'days').toDate()
    });

    return res.send(_at);
  }

  @ApiOperation({ summary: 'Resource for sign up user.' })
  @ApiResponse({ status: 200, type: User })
  @Post('/sign-up')
  signUp(@Body() signUpUserDto: SignUpUserDto): Promise<User> {
    return this.userService.signUp(signUpUserDto);
  }

  @ApiOperation({ summary: 'Resource for user logout.' })
  @ApiResponse({ status: 200, type: '1' })
  @UseGuards(AuthGuard)
  @Post('/logout')
  logout(@UserDecorator() userId: string): Promise<number> {
    return this.userService.logout(userId);
  }

  @ApiOperation({
    summary:
      'Resource for getting all users. Allowed only for users with ADMIN role.'
  })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(RoleGuard, AuthGuard)
  @Roles('ADMIN')
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Resource allows user with ADMIN role ban user.' })
  @ApiResponse({ status: 200, type: UserBan })
  @UseGuards(RoleGuard, AuthGuard)
  @Roles('ADMIN')
  @Post('/ban')
  banUser(@Body() banUserDto: BanUserDto): Promise<UserBan> {
    return this.userService.banUser(banUserDto);
  }
}
