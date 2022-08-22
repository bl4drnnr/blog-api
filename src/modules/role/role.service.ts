import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from "@models/role.model";
import { DistributeRoleDto, RoleDto } from '../../dto/role';
import { UserService } from '../user/user.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role) private roleRepository: typeof Role,
    @Inject(forwardRef(() => UserService))
    private userService: UserService
  ) {}

  async createRole(roleDto: RoleDto) {
    return await this.roleRepository.create(roleDto);
  }

  async getRole(conditionals: object) {
    return await this.roleRepository.findOne({
      where: { ...conditionals }
    });
  }

  async listRoles() {
    return await this.roleRepository.findAll();
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
    throw new HttpException('No-role-or-user', HttpStatus.NOT_FOUND);
  }
}
