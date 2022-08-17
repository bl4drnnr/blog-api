import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from '../../models/post.model';
import { PostDto } from '../../dto/post/post.dto';
import { Op } from 'sequelize';
import { CommentPostDto } from '../../dto/post/comment-post.dto';
import { PostComment } from '../../models/comment.model';
import { User } from '../../models/user.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    @InjectModel(PostComment) private commentRepository: typeof PostComment
  ) {}

  async createPost(createPostDto: PostDto): Promise<Post> {
    return await this.postRepository.create(createPostDto);
  }

  async getPostBySlug(
    slug: string
  ): Promise<{ post: Post; postComments: PostComment[] }> {
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

  async deletePost(id: string): Promise<number> {
    return await this.postRepository.destroy({ where: { id } });
  }

  async getPosts({
    offset,
    limit
  }: {
    offset: number;
    limit: number;
  }): Promise<{ rows: Post[]; count: number }> {
    return await this.postRepository.findAndCountAll({
      order: [['createdAt', 'DESC']],
      attributes: ['title', 'slug', 'description'],
      limit,
      offset,
      raw: true
    });
  }

  async commentPost(
    commentPostDto: CommentPostDto,
    userId: string
  ): Promise<PostComment> {
    return await this.commentRepository.create({
      userId,
      ...commentPostDto
    });
  }
}
