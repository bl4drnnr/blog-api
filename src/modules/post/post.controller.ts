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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../decorator/role.decorator';
import { Post as PostModel } from '../../models/post.model';
import { RoleGuard } from '../../guard/role.guard';
import { AuthGuard } from '../../guard/auth.guard';
import { CommentPostDto } from '../../dto/post/comment-post.dto';
import { PostComment } from '../../models/comment.model';
import { User as UserDecorator } from '../../decorator/user.decorator';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @ApiOperation({ summary: 'Resource allows administrator to create posts.' })
  @ApiResponse({ status: 200, type: PostModel })
  @UseGuards(RoleGuard, AuthGuard)
  @Roles('ADMIN')
  @Post()
  createPost(@Body() createPostDto: PostDto): Promise<PostModel> {
    return this.postService.createPost(createPostDto);
  }

  @ApiOperation({ summary: 'Resource allows administrator to delete posts.' })
  @ApiResponse({ status: 200, type: PostModel })
  @UseGuards(RoleGuard, AuthGuard)
  @Roles('ADMIN')
  @Delete(':id')
  deletePost(@Param(':id') id: string): Promise<number> {
    return this.postService.deletePost(id);
  }

  @ApiOperation({ summary: 'Resource allows everyone to get post.' })
  @ApiResponse({ status: 200, type: PostModel })
  @Get(':slug')
  getPostBySlug(@Param('slug') slug: string): Promise<PostModel> {
    return this.postService.getPostBySlug(slug);
  }

  @ApiOperation({ summary: 'Resource allows to get posts.' })
  @ApiResponse({ status: 200, type: [PostModel] })
  @Get(':offset/:limit/:from/:to')
  getPosts(
    @Param('offset', ParseIntPipe) offset: number,
    @Param('limit', ParseIntPipe) limit: number,
    @Param('from') from: string,
    @Param('to') to: string
  ): Promise<{ rows: PostModel[]; count: number }> {
    return this.postService.getPosts({ offset, limit, from, to });
  }

  @ApiOperation({
    summary: 'Resource allows authorized user to comment the post.'
  })
  @ApiResponse({ status: 200, type: PostComment })
  @UseGuards(AuthGuard)
  @Post('/comment')
  commentPost(
    @Body() commentPostDto: CommentPostDto,
    @UserDecorator() userId: string
  ): Promise<PostComment> {
    return this.postService.commentPost(commentPostDto, userId);
  }
}
