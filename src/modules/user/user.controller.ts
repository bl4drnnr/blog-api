import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '@decorators/role.decorator';
import { RoleGuard } from '@guards/role.guard';
import { AuthGuard } from '@guards/auth.guard';
import { User } from '@models/user.model';
import {
  UnbanUserResponse,
  SignInUserResponse,
  SignUpUserResponse,
  BanUserDto,
  SignUpUserDto,
  SignInUserDto,
  UnbanUserDto,
  BanUserResponse,
  LogoutResponse
} from './dto';
import { Ban } from '@models/ban.model';
import { User as UserDecorator } from '../../decorator/user.decorator';
import { FastifyReply } from 'fastify';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Resource for signing user in system' })
  @ApiResponse({ status: 201, type: String })
  @Post('/sign-in')
  async signIn(
    @Body() payload: SignInUserDto,
    @Res({ passthrough: true }) res: FastifyReply
  ) {
    const { _at, _rt } = await this.userService.signIn(payload);

    res.cookie('_rt', _rt);

    return new SignInUserResponse(_at);
  }

  @ApiOperation({ summary: 'Resource for signing user up system' })
  @ApiResponse({ status: 201, type: User })
  @Post('/sign-up')
  async signUp(@Body() payload: SignUpUserDto) {
    const user = await this.userService.signUp(payload);

    return new SignUpUserResponse(user.email);
  }

  @ApiOperation({ summary: 'Resource for log user out of the system' })
  @ApiResponse({ status: 201, type: Number })
  @UseGuards(AuthGuard)
  @Post('/logout')
  async logout(
    @UserDecorator() userId: string,
    @Res({ passthrough: true }) res: FastifyReply
  ) {
    res.clearCookie('_rt');
    await this.userService.logout(userId);

    return new LogoutResponse();
  }

  @ApiOperation({ summary: 'Resource for getting users (ADMIN only)' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(RoleGuard, AuthGuard)
  @Roles('ADMIN')
  @Get(':offset/:limit')
  getAllUsers(
    @Param('offset', ParseIntPipe) offset: number,
    @Param('limit', ParseIntPipe) limit: number
  ) {
    return this.userService.getUsers({ offset, limit });
  }

  @ApiOperation({ summary: 'Resource for getting one user (ADMIN only)' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(RoleGuard, AuthGuard)
  @Roles('ADMIN')
  @Get('/one')
  getUser(@Query('username') username: string) {
    return this.userService.getUserByNickname(username);
  }

  @ApiOperation({ summary: 'Resource for ban users (ADMIN only)' })
  @ApiResponse({ status: 201, type: Ban })
  @UseGuards(RoleGuard, AuthGuard)
  @Roles('ADMIN')
  @Post('/ban')
  async banUser(@Body() payload: BanUserDto) {
    await this.userService.banUser(payload);

    return new BanUserResponse();
  }

  @ApiOperation({ summary: 'Resource for unban users (ADMIN only)' })
  @ApiResponse({ status: 201, type: Number })
  @UseGuards(RoleGuard, AuthGuard)
  @Roles('ADMIN')
  @Post('/unban')
  async unbanUser(@Body() payload: UnbanUserDto) {
    await this.userService.unbanUser(payload.email);

    return new UnbanUserResponse();
  }
}
