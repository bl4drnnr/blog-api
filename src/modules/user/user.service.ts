import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@models/user.model';
import { Op } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import { AuthService } from '../auth/auth.service';
import { RoleService } from '../role/role.service';
import { BanUserDto, SignUpUserDto, SignInUserDto } from './dto/user';
import { Ban } from '@models/ban.model';
import { Role } from '@models/role.model';
import { ConfigService } from '@shared/config.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Ban) private banRepository: typeof Ban,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    @Inject(forwardRef(() => RoleService))
    private roleService: RoleService,
    private configService: ConfigService
  ) {}

  async signIn(signInUserDto: SignInUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: signInUserDto.email },
      include: [
        {
          model: Role,
          attributes: ['value'],
          through: { attributes: [] }
        }
      ]
    });
    if (!user)
      throw new HttpException('Wrong-credentials', HttpStatus.BAD_REQUEST);

    const passwordEquality = await bcrypt.compare(
      signInUserDto.password,
      user.password
    );

    if (!passwordEquality)
      throw new HttpException('Wrong-credentials', HttpStatus.BAD_REQUEST);

    return await this.authService.updateTokens({
      userId: user.id,
      username: user.username,
      roles: user.roles
    });
  }

  async signUp(signUpUserDto: SignUpUserDto) {
    const sameEmailUsernameUser = await this.userRepository.findOne({
      where: {
        [Op.or]: [
          { email: signUpUserDto.email },
          { username: signUpUserDto.username }
        ]
      }
    });

    if (sameEmailUsernameUser)
      throw new HttpException('User-already-exists', HttpStatus.BAD_REQUEST);

    const hashedPassword = await bcrypt.hash(signUpUserDto.password, 5);
    const user = await this.userRepository.create({
      ...signUpUserDto,
      password: hashedPassword
    });

    let role: Role;

    if (signUpUserDto.email === this.configService.administratorEmail)
      role = await this.roleService.getRole({ value: 'ADMIN' });
    else role = await this.roleService.getRole({ value: 'USER' });

    await user.$set('roles', [role.id]);
    user.roles = [role];

    return user;
  }

  async getUser(conditionals: object) {
    return await this.userRepository.findOne({
      where: { ...conditionals },
      include: [
        {
          model: Role,
          attributes: ['value'],
          through: { attributes: [] }
        }
      ]
    });
  }

  async getUserByNickname(username: string) {
    return await this.userRepository.findAndCountAll({
      attributes: ['id', 'email', 'username', 'firstName', 'lastName'],
      where: {
        username: {
          [Op.iLike]: `%${username}%`
        }
      },
      include: [
        {
          model: Ban,
          attributes: ['reason']
        }
      ],
      raw: true
    });
  }

  async logout(userId: string) {
    return await this.authService.deleteRefreshToken(userId);
  }

  async getUsers({ offset, limit }: { offset: number; limit: number }) {
    return await this.userRepository.findAndCountAll({
      attributes: ['id', 'email', 'username', 'firstName', 'lastName'],
      include: [
        {
          model: Ban,
          attributes: ['reason']
        }
      ],
      order: [['createdAt', 'DESC']],
      offset,
      limit,
      raw: true
    });
  }

  async banUser(banUserDto: BanUserDto): Promise<Ban> {
    const user = await this.userRepository.findOne({
      where: { email: banUserDto.email }
    });
    return await this.banRepository.create({
      userId: user.id,
      reason: banUserDto.reason
    });
  }

  async unbanUser(email: string): Promise<number> {
    const user = await this.userRepository.findOne({
      where: { email }
    });
    return await this.banRepository.destroy({
      where: {
        userId: user.id
      }
    });
  }
}
