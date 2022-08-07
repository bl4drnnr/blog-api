import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from '../models/post.model';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [SequelizeModule.forFeature([Post]), JwtModule, AuthModule]
})
export class PostModule {}
