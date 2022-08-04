import { Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from '../dto/post.dto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  createPost(postDto: PostDto) {
    return this.postService.createPost(postDto);
  }
}
