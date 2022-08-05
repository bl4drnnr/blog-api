import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../models/user.model';
import { SignUpUserDto } from '../dto/user/sign-up-user.dto';
import { SignInUserDto } from '../dto/user/sign-in-user.dto';
import { Op } from 'sequelize';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private userRepository: typeof UserModel
  ) {}

  async signIn(signInUserDto: SignInUserDto) {
    return signInUserDto;
  }

  async signUp(signUpUserDto: SignUpUserDto) {
    const sameEmailUsernameUser = this.userRepository.findOne({
      where: {
        [Op.or]: [
          { email: signUpUserDto.email },
          { username: signUpUserDto.username }
        ]
      }
    });
    if (sameEmailUsernameUser)
      throw new HttpException('user-already-exists', HttpStatus.BAD_REQUEST);

    const hashedPassword = bcrypt.hash(signUpUserDto.password, 5);
    return await this.userRepository.create({
      ...signUpUserDto,
      password: hashedPassword
    });
  }
}
