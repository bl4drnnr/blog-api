import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { RoleModule } from '../role/role.module';
import { Ban } from '../models/ban.model';
import { SharedModule } from '../shared/shared.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([User, Ban]),
    forwardRef(() => AuthModule),
    forwardRef(() => RoleModule),
    JwtModule,
    SharedModule
  ],
  exports: [UserService]
})
export class UserModule {}
