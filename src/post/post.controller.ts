import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from '../dto/post/create-post.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorator/role.decorator';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @ApiOperation({ summary: 'Resource allows administrator to create posts' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @Post()
  createPost(createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  @ApiOperation({ summary: 'Resource allows administrator to delete posts' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @Delete(':id')
  deletePost(@Param(':id') id: string) {
    return this.postService.deletePost(id);
  }

  @ApiOperation({ summary: 'Resource allows everyone to get post' })
  @ApiResponse({ status: 200 })
  @Get(':slug')
  getPostBySlug(@Param('slug') slug: string) {
    return this.postService.getPostBySlug(slug);
  }
}
