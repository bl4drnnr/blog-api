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

interface IPostCommentAttributes {
  comment: string;
  userId: string;
  postId: string;
}

@Table
export class PostComment extends Model<PostComment, IPostCommentAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Post)
  @Column({ type: DataType.UUID })
  postId: string;

  @BelongsTo(() => Post)
  post: Post;

  @Column({ type: DataType.STRING })
  comment: string;
}
