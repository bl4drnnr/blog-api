import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable
} from '@nestjs/common';
import { RoleDto } from '../dto/role/role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from '../models/role.model';
import { DistributeRoleDto } from '../dto/role/distribute-role.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role) private roleRepository: typeof Role,
    @Inject(forwardRef(() => UserService))
    private userService: UserService
  ) {}

  async createRole(roleDto: RoleDto): Promise<Role> {
    return await this.roleRepository.create(roleDto);
  }

  async getRole(conditionals: object): Promise<Role> {
    return await this.roleRepository.findOne({
      where: { ...conditionals }
    });
  }

  async listRoles(): Promise<Role[]> {
    return await this.roleRepository.findAll();
  }

  async distributeRole(
    distributeRoleDto: DistributeRoleDto
  ): Promise<DistributeRoleDto> {
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
