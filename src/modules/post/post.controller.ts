import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { PostService } from './post.service';
import { Roles } from '@decorators/role.decorator';
import { RoleGuard } from '@guards/role.guard';
import { AuthGuard } from '@guards/auth.guard';
import { CommentPostDto, PostDto } from '../../dto/post';
import { User } from '@decorators/user.decorator';
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
  createPost(@Body() createPostDto: PostDto) {
    return this.postService.createPost(createPostDto);
  }

  @ApiOperation({ summary: 'Resource for creating deleting post (ADMIN only)' })
  @ApiResponse({ status: 200, type: Number })
  @UseGuards(RoleGuard, AuthGuard)
  @Roles('ADMIN')
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }

  @ApiOperation({ summary: 'Resource for getting post by slug' })
  @ApiResponse({ status: 200, type: PostModel })
  @Get(':slug')
  getPostBySlug(@Param('slug') slug: string) {
    return this.postService.getPostBySlug(slug);
  }

  @ApiOperation({ summary: 'Get posts using query search' })
  @ApiResponse({ status: 200, type: [PostModel] })
  @Get('/one')
  getPostByQuery(@Query('post') post: string) {
    return this.postService.getPostByQuery(post);
  }

  @ApiOperation({ summary: 'Resource for getting posts' })
  @ApiResponse({ status: 200, type: [PostModel] })
  @Get(':offset/:limit')
  getPosts(
    @Param('offset', ParseIntPipe) offset: number,
    @Param('limit', ParseIntPipe) limit: number
  ) {
    return this.postService.getPosts({ offset, limit });
  }

  @ApiOperation({ summary: 'Resource for commenting post' })
  @ApiResponse({ status: 201, type: CommentPostDto })
  @UseGuards(AuthGuard)
  @Post('/comment')
  commentPost(@Body() commentPostDto: CommentPostDto, @User() userId: string) {
    return this.postService.commentPost(commentPostDto, userId);
  }
}
