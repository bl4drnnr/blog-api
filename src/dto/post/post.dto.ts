import { IsNotEmpty } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly content: string;

  @IsNotEmpty()
  readonly description: string;
}
