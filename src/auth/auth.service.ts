import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SessionModel } from '../models/session.model';
import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '../shared/config.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(SessionModel) private sessionRepository: typeof SessionModel,
    private jwtService: JwtService
  ) {}

  generateRefreshToken() {
    //
  }

  generateAccessToken() {
    //
  }

  validateToken() {
    //
  }
}
