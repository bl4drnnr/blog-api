import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { SessionModel } from '../models/session.model';
import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from 'src/shared/config.service';

@Module({
  providers: [AuthService, JwtService],
  exports: [AuthService],
  imports: [SequelizeModule.forFeature([SessionModel])]
})
export class AuthModule {}
