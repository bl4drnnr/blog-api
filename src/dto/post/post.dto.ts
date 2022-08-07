import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
  @ApiProperty({
    example: 'Everything you need to know about ES6',
    description: 'Title of the post'
  })
  readonly title: string;

  @ApiProperty({
    example: 'Here where content goes...',
    description: 'Content of the post'
  })
  readonly content: string;
}
