import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { RoleDto } from '../dto/role/role.dto';
import { Role } from '../models/role.model';
import { DistributeRoleDto } from '../dto/role/distribute-role.dto';

@ApiTags('Roles')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @ApiOperation({
    summary: 'Resource allows user with role ADMIN to create new roles'
  })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  createRole(@Body() roleDto: RoleDto) {
    return this.roleService.createRole(roleDto);
  }

  @ApiOperation({
    summary: 'Resource allow user with role ADMIN to distribute roles'
  })
  @ApiResponse({ status: 200, type: DistributeRoleDto })
  @Post('/distribute')
  distributeRole(distributeRoleDto: DistributeRoleDto) {
    return this.roleService.distributeRole(distributeRoleDto);
  }
}
