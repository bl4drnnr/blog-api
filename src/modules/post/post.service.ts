import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from '@models/post.model';
import { CommentPostDto, PostDto } from '../../dto/post';
import { PostComment } from '@models/comment.model';
import { User } from '@models/user.model';
import { Op } from 'sequelize';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    @InjectModel(PostComment) private commentRepository: typeof PostComment
  ) {}

  async createPost(createPostDto: PostDto) {
    const slug = createPostDto.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return await this.postRepository.create({ ...createPostDto, slug });
  }

  async getPostBySlug(slug: string) {
    const post = await this.postRepository.findOne({
      where: { slug },
      raw: true
    });
    const postComments = await this.commentRepository.findAll({
      where: { postId: post.id },
      attributes: ['comment'],
      include: [
        {
          model: User,
          attributes: ['email']
        }
      ],
      raw: true
    });
    return { post, postComments };
  }

  async getPostByQuery(post: string) {
    return await this.postRepository.findAndCountAll({
      where: {
        title: {
          [Op.iLike]: `%${post}%`
        }
      },
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'title', 'slug', 'description'],
      raw: true
    });
  }

  async deletePost(id: string) {
    return await this.postRepository.destroy({ where: { id } });
  }

  async getPosts({ offset, limit }: { offset: number; limit: number }) {
    return await this.postRepository.findAndCountAll({
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'title', 'slug', 'description'],
      limit,
      offset,
      raw: true
    });
  }

  async commentPost(commentPostDto: CommentPostDto, userId: string) {
    return await this.commentRepository.create({
      userId,
      ...commentPostDto
    });
  }
}
