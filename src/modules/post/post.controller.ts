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
import { User } from '../../decorator/user.decorator';
import { PostComment } from '../../models/comment.model';
import { Post as PostModel } from '../../models/post.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @ApiOperation({ summary: 'Resource for creating post (ADMIN only)' })
  @ApiResponse({ status: 201, type: PostModel })
  @UseGuards(RoleGuard, AuthGuard)
  @Roles('ADMIN')
  @Post()
  createPost(@Body() createPostDto: PostDto): Promise<PostModel> {
    return this.postService.createPost(createPostDto);
  }

  @ApiOperation({ summary: 'Resource for creating deleting post (ADMIN only)' })
  @ApiResponse({ status: 200, type: Number })
  @UseGuards(RoleGuard, AuthGuard)
  @Roles('ADMIN')
  @Delete(':id')
  deletePost(@Param(':id') id: string): Promise<number> {
    return this.postService.deletePost(id);
  }

  @ApiOperation({ summary: 'Resource for getting post by slug' })
  @ApiResponse({ status: 200, type: PostModel })
  @Get(':slug')
  getPostBySlug(
    @Param('slug') slug: string
  ): Promise<{ post: PostModel; postComments: PostComment[] }> {
    return this.postService.getPostBySlug(slug);
  }

  @ApiOperation({ summary: 'Resource for getting posts' })
  @ApiResponse({ status: 200, type: PostModel })
  @Get(':offset/:limit/:from/:to')
  getPosts(
    @Param('offset', ParseIntPipe) offset: number,
    @Param('limit', ParseIntPipe) limit: number,
    @Param('from') from: string,
    @Param('to') to: string
  ): Promise<{ rows: PostModel[]; count: number }> {
    return this.postService.getPosts({ offset, limit, from, to });
  }

  @ApiOperation({ summary: 'Resource for commenting post' })
  @ApiResponse({ status: 201, type: CommentPostDto })
  @UseGuards(AuthGuard)
  @Post('/comment')
  commentPost(
    @Body() commentPostDto: CommentPostDto,
    @User() userId: string
  ): Promise<CommentPostDto> {
    return this.postService.commentPost(commentPostDto, userId);
  }
}
