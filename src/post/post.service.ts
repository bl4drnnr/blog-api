import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from '../models/post.model';
import { PostDto } from '../dto/post/post.dto';
import { Op } from 'sequelize';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post) private postRepository: typeof Post) {}

  async createPost(createPostDto: PostDto): Promise<Post> {
    return await this.postRepository.create(createPostDto);
  }

  async getPostBySlug(slug: string): Promise<Post> {
    return await this.postRepository.findOne({
      where: { slug }
    });
  }

  async deletePost(id: string): Promise<number> {
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
  }): Promise<{ rows: Post[]; count: number }> {
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
