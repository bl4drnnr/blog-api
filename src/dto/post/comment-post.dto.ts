import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentPostDto {
  @ApiProperty({
    example: 'dbf53edc-7a8c-4ec5-9675-df06fd5e8171',
    description: 'Unique id of post'
  })
  @IsNotEmpty()
  @IsUUID(4)
  readonly postId: string;

  @ApiProperty({
    example: 'dbf53edc-7a8c-4ec5-9675-df06fd5e8171',
    description: 'Comment content'
  })
  @IsNotEmpty()
  readonly comment: string;
}
