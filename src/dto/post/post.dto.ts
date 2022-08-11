import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PostDto {
  @ApiProperty({
    example: 'Everything you need to know about ES6',
    description: 'Title of the post'
  })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    example: 'Here where content goes...',
    description: 'Content of the post'
  })
  @IsNotEmpty()
  readonly content: string;
}
