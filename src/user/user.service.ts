import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { SignUpUserDto } from '../dto/user/sign-up-user.dto';
import { SignInUserDto } from '../dto/user/sign-in-user.dto';
import { Op } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) {}

  async signIn(signInUserDto: SignInUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: signInUserDto.email }
    });
    const passwordEquality = await bcrypt.compare(
      signInUserDto.password,
      user.password
    );

    if (!user || !passwordEquality)
      throw new HttpException('wrong-credentials', HttpStatus.BAD_REQUEST);

    const { refreshToken, accessToken } = await this.authService.updateTokens({
      userId: user.id,
      username: user.username
    });

    return { _rt: refreshToken, _at: accessToken };
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
      throw new HttpException('user-already-exists', HttpStatus.BAD_REQUEST);

    const hashedPassword = await bcrypt.hash(signUpUserDto.password, 5);
    return await this.userRepository.create({
      ...signUpUserDto,
      password: hashedPassword
    });
  }

  async logout(userId: string) {
    return await this.authService.deleteRefreshToken(userId);
  }

  async getUser(conditionals: object) {
    return await this.userRepository.findOne({
      where: { ...conditionals }
    });
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }
}
