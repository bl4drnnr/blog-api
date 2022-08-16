import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from '../../dto/role/role.dto';
import { Role } from '../../models/role.model';
import { DistributeRoleDto } from '../../dto/role/distribute-role.dto';
import { RoleGuard } from '../../guard/role.guard';
import { AuthGuard } from '../../guard/auth.guard';
import { Roles } from '../../decorator/role.decorator';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  createRole(@Body() roleDto: RoleDto): Promise<Role> {
    return this.roleService.createRole(roleDto);
  }

  @UseGuards(RoleGuard, AuthGuard)
  @Roles('ADMIN')
  @Post('/distribute')
  distributeRole(
    @Body() distributeRoleDto: DistributeRoleDto
  ): Promise<DistributeRoleDto> {
    return this.roleService.distributeRole(distributeRoleDto);
  }
}
