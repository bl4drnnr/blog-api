import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';
import { Post } from './post.model';

interface IPostCommentAttributes {
  comment: string;
  userId: string;
  postId: string;
}

@Table
export class PostComment extends Model<PostComment, IPostCommentAttributes> {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique uuid of record'
  })
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique uuid of record'
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique uuid of record'
  })
  @ForeignKey(() => Post)
  @Column({ type: DataType.UUID })
  postId: string;

  @BelongsTo(() => Post)
  post: Post;

  @ApiProperty({
    example: 'This post sucks!',
    description: 'Comment of the post'
  })
  @Column({ type: DataType.STRING })
  comment: string;
}
