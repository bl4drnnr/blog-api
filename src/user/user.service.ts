import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../models/user.model';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private userRepository: typeof UserModel
  ) {}

  async signIn(userDto: UserDto) {
    return userDto;
  }

  async signUp(userDto: UserDto) {
    return await this.userRepository.create(userDto);
  }
}
