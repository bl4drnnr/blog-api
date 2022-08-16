import { IsNotEmpty, IsUUID } from 'class-validator';

export class CommentPostDto {
  @IsNotEmpty()
  @IsUUID(4)
  readonly postId: string;

  @IsNotEmpty()
  readonly comment: string;
}
