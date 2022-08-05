import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from '../dto/post/create-post.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @ApiOperation({ summary: 'Resource allows administrator to create posts' })
  @ApiResponse({ status: 200 })
  @Post()
  createPost(createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  @ApiOperation({ summary: 'Resource allows everyone to get post' })
  @ApiResponse({ status: 200 })
  @Get(':slug')
  getPostBySlug(@Param('slug') slug: string) {
    return this.postService.getPostBySlug(slug);
  }

  @ApiOperation({ summary: 'Resource allows administrator to delete posts' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  deletePost(@Param(':id') id: string) {
    return this.postService.deletePost(id);
  }
}
