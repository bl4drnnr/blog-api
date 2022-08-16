import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostDto {
  @ApiProperty({
    example: 'How JS runs the world',
    description: 'Title of post'
  })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    example: 'Today we well talk more about JS',
    description: 'Short description of the post'
  })
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({
    example: 'Blah... Blah... Blah...',
    description: 'Post content'
  })
  @IsNotEmpty()
  readonly content: string;
}
