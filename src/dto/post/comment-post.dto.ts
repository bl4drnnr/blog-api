import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CommentPostDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique uuid of record'
  })
  @IsNotEmpty()
  readonly postId: string;

  @ApiProperty({
    example: 'This post sucks!',
    description: 'Comment of the post'
  })
  @IsNotEmpty()
  readonly comment: string;
}
