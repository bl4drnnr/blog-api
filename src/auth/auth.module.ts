import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Session } from '../models/session.model';
import { JwtService } from '@nestjs/jwt';
import { SharedModule } from '../shared/shared.module';

@Module({
  providers: [AuthService, JwtService],
  exports: [AuthService],
  imports: [SequelizeModule.forFeature([Session]), SharedModule]
})
export class AuthModule {}
