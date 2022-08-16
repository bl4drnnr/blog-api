import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpUserDto } from '../../dto/user/sign-up-user.dto';
import { SignInUserDto } from '../../dto/user/sign-in-user.dto';
import { Roles } from '../../decorator/role.decorator';
import { RoleGuard } from '../../guard/role.guard';
import { AuthGuard } from '../../guard/auth.guard';
import { User } from '../../models/user.model';
import { BanUserDto } from '../../dto/user/ban-user.dto';
import { Ban } from '../../models/ban.model';
import { User as UserDecorator } from '../../decorator/user.decorator';
import { FastifyReply } from 'fastify';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/sign-in')
  async signIn(
    @Body() signInUserDto: SignInUserDto,
    @Res({ passthrough: true }) res: FastifyReply
  ): Promise<string> {
    const { _at, _rt } = await this.userService.signIn(signInUserDto);

    res.cookie('_rt', _rt);

    return res.send(_at);
  }

  @Post('/sign-up')
  signUp(@Body() signUpUserDto: SignUpUserDto): Promise<User> {
    return this.userService.signUp(signUpUserDto);
  }

  @UseGuards(AuthGuard)
  @Post('/logout')
  logout(
    @UserDecorator() userId: string,
    @Res({ passthrough: true }) res: FastifyReply
  ): Promise<number> {
    res.clearCookie('_rt');
    return this.userService.logout(userId);
  }

  @UseGuards(RoleGuard, AuthGuard)
  @Roles('ADMIN')
  @Get(':offset/:limit')
  getAllUsers(
    @Param('offset', ParseIntPipe) offset: number,
    @Param('limit', ParseIntPipe) limit: number
  ): Promise<User[]> {
    return this.userService.getAllUsers({ offset, limit });
  }

  @UseGuards(RoleGuard, AuthGuard)
  @Roles('ADMIN')
  @Post('/ban')
  banUser(@Body() banUserDto: BanUserDto): Promise<Ban> {
    return this.userService.banUser(banUserDto);
  }
}
