import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from '../models/role.model';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [SequelizeModule.forFeature([Role]), UserModule],
  exports: [RoleService]
})
export class RoleModule {}
