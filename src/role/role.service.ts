import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RoleDto } from '../dto/role/role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from '../models/role.model';
import { DistributeRoleDto } from '../dto/role/distribute-role.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role) private roleRepository: typeof Role,
    private userService: UserService
  ) {}

  async createRole(roleDto: RoleDto) {
    return await this.roleRepository.create(roleDto);
  }

  async distributeRole(distributeRoleDto: DistributeRoleDto) {
    const user = await this.userService.getUser({
      username: distributeRoleDto.username
    });
    const role = await this.roleRepository.findOne({
      where: { value: distributeRoleDto.value }
    });

    if (role && user) {
      await user.$add('role', role.id);
      return distributeRoleDto;
    }
    throw new HttpException('no-role-or-user', HttpStatus.NOT_FOUND);
  }
}

// async addRole(addRoleDto: AddRoleDto) {
//   const user = await this.getUserByEmail(addRoleDto.email);
//   const role = await this.roleService.getRoleByName(addRoleDto.value);
//
//   if (role && user) {
//     await user.$add('role', role.id);
//     return addRoleDto;
//   }
//   throw new HttpException('no-role-or-user', HttpStatus.NOT_FOUND);
// }
