import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../models/user.model';
import { SignUpUserDto } from '../dto/user/sign-up-user.dto';
import { SignInUserDto } from '../dto/user/sign-in-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private userRepository: typeof UserModel
  ) {}

  async signIn(signInUserDto: SignInUserDto) {
    return signInUserDto;
  }

  async signUp(signUpUserDto: SignUpUserDto) {
    return await this.userRepository.create(signUpUserDto);
  }

  private async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email }
    });
  }
}
