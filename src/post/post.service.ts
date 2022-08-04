import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PostModel } from '../models/post.model';
import { PostDto } from '../dto/post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostModel) private postRepository: typeof PostModel
  ) {}

  async createPost(postDto: PostDto) {
    return await this.postRepository.create(postDto);
  }
}
