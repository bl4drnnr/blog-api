import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { RoleDto } from '../dto/request/role/role.dto';
import { Role } from '../models/role.model';
import { DistributeRoleDto } from '../dto/request/role/distribute-role.dto';
import { RoleGuard } from '../guard/role.guard';
import { AuthGuard } from '../guard/auth.guard';
import { Roles } from '../decorator/role.decorator';

@ApiTags('Roles')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @ApiOperation({
    summary: 'Resource allows user with role ADMIN to create new roles.'
  })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  createRole(@Body() roleDto: RoleDto): Promise<Role> {
    return this.roleService.createRole(roleDto);
  }

  @ApiOperation({
    summary: 'Resource allow user with role ADMIN to distribute roles.'
  })
  @ApiResponse({ status: 200, type: DistributeRoleDto })
  @UseGuards(RoleGuard, AuthGuard)
  @Roles('ADMIN')
  @Post('/distribute')
  distributeRole(
    @Body() distributeRoleDto: DistributeRoleDto
  ): Promise<DistributeRoleDto> {
    return this.roleService.distributeRole(distributeRoleDto);
  }
}
