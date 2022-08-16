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
import { User } from './user.model';
import { Post } from './post.model';
import { ApiProperty } from '@nestjs/swagger';

interface IPostCommentAttributes {
  comment: string;
  userId: string;
  postId: string;
}

@Table
export class PostComment extends Model<PostComment, IPostCommentAttributes> {
  @ApiProperty({
    example: 'dbf53edc-7a8c-4ec5-9675-df06fd5e8171',
    description: 'Unique id of record'
  })
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id: string;

  @ApiProperty({
    example: 'dbf53edc-7a8c-4ec5-9675-df06fd5e8171',
    description: 'Id of user, who left the comment'
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({
    example: 'dbf53edc-7a8c-4ec5-9675-df06fd5e8171',
    description: 'Post id, where comment had been left'
  })
  @ForeignKey(() => Post)
  @Column({ type: DataType.UUID })
  postId: string;

  @BelongsTo(() => Post)
  post: Post;

  @ApiProperty({
    example: 'dbf53edc-7a8c-4ec5-9675-df06fd5e8171',
    description: 'Comment content'
  })
  @Column({ type: DataType.STRING })
  comment: string;
}
