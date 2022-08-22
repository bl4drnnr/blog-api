import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from '@models/role.model';
import { DistributeRoleDto, RoleDto } from '../../dto/role';
import { RoleGuard } from '@guards/role.guard';
import { AuthGuard } from '@guards/auth.guard';
import { Roles } from '@decorators/role.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @ApiOperation({ summary: 'Resource for creating role' })
  @ApiResponse({ status: 201, type: Role })
  @Post()
  createRole(@Body() roleDto: RoleDto) {
    return this.roleService.createRole(roleDto);
  }

  @ApiOperation({ summary: 'Resource for distributing role' })
  @ApiResponse({ status: 201, type: DistributeRoleDto })
  @UseGuards(RoleGuard, AuthGuard)
  @Roles('ADMIN')
  @Post('/distribute')
  distributeRole(@Body() distributeRoleDto: DistributeRoleDto) {
    return this.roleService.distributeRole(distributeRoleDto);
  }
}
