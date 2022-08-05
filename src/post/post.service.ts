import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PostModel } from '../models/post.model';
import { CreatePostDto } from '../dto/post/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostModel) private postRepository: typeof PostModel
  ) {}

  async createPost(createPostDto: CreatePostDto) {
    return await this.postRepository.create(createPostDto);
  }

  async getPostBySlug(slug: string) {
    return await this.postRepository.findOne({
      where: { slug }
    });
  }

  async deletePost(id: string) {
    return await this.postRepository.destroy({
      where: { id }
    });
  }
}
