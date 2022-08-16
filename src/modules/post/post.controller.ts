import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from '../../dto/post/post.dto';
import { Roles } from '../../decorator/role.decorator';
import { RoleGuard } from '../../guard/role.guard';
import { AuthGuard } from '../../guard/auth.guard';
import { CommentPostDto } from '../../dto/post/comment-post.dto';
import { User as UserDecorator } from '../../decorator/user.decorator';
import { IFullPost } from '../../interface/full-post.interface';
import { IPostPreview } from '../../interface/post-preview.interface';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(RoleGuard, AuthGuard)
  @Roles('ADMIN')
  @Post()
  createPost(@Body() createPostDto: PostDto): Promise<PostDto> {
    return this.postService.createPost(createPostDto);
  }

  @UseGuards(RoleGuard, AuthGuard)
  @Roles('ADMIN')
  @Delete(':id')
  deletePost(@Param(':id') id: string): Promise<number> {
    return this.postService.deletePost(id);
  }

  @Get(':slug')
  getPostBySlug(@Param('slug') slug: string): Promise<IFullPost> {
    return this.postService.getPostBySlug(slug);
  }

  @Get(':offset/:limit/:from/:to')
  getPosts(
    @Param('offset', ParseIntPipe) offset: number,
    @Param('limit', ParseIntPipe) limit: number,
    @Param('from') from: string,
    @Param('to') to: string
  ): Promise<IPostPreview> {
    return this.postService.getPosts({ offset, limit, from, to });
  }

  @UseGuards(AuthGuard)
  @Post('/comment')
  commentPost(
    @Body() commentPostDto: CommentPostDto,
    @UserDecorator() userId: string
  ): Promise<CommentPostDto> {
    return this.postService.commentPost(commentPostDto, userId);
  }
}
