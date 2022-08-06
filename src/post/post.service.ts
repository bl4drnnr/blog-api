import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from '../models/post.model';
import { CreatePostDto } from '../dto/post/create-post.dto';
import { Op } from 'sequelize';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post) private postRepository: typeof Post) {}

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

  async getPosts({
    offset,
    limit,
    from,
    to
  }: {
    offset: number;
    limit: number;
    from: string;
    to: string;
  }) {
    return await this.postRepository.findAndCountAll({
      where: {
        createdAt: {
          [Op.between]: [from, to]
        }
      },
      order: [['createdAt', 'DESC']],
      limit,
      offset
    });
  }
}
