import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from '@models/role.model';
import {
  DistributeRoleDto,
  CreateRoleDto,
  CreateRoleResponse,
  DistributeRoleResponse
} from './dto';
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
  async createRole(@Body() payload: CreateRoleDto) {
    const role = await this.roleService.createRole(payload);

    return new CreateRoleResponse(role.id);
  }

  @ApiOperation({ summary: 'Resource for distributing role' })
  @ApiResponse({ status: 201, type: DistributeRoleDto })
  @UseGuards(RoleGuard, AuthGuard)
  @Roles('ADMIN')
  @Post('/distribute')
  async distributeRole(@Body() distributeRoleDto: DistributeRoleDto) {
    const distributedRole = await this.roleService.distributeRole(
      distributeRoleDto
    );

    return new DistributeRoleResponse(distributedRole.username);
  }
}
