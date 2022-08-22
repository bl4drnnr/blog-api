import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Session } from "@models/session.model";
import { JwtService } from '@nestjs/jwt';
import { SharedModule } from "@shared/shared.module";
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

@Module({
  providers: [AuthService, JwtService],
  exports: [AuthService],
  imports: [
    SequelizeModule.forFeature([Session]),
    forwardRef(() => UserModule),
    SharedModule
  ],
  controllers: [AuthController]
})
export class AuthModule {}
