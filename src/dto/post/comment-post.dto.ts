import { ApiProperty } from '@nestjs/swagger';

export class CommentPostDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique uuid of record'
  })
  readonly postId: string;

  @ApiProperty({
    example: 'This post sucks!',
    description: 'Comment of the post'
  })
  readonly comment: string;
}
