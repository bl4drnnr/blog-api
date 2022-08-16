import {
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import { PostComment } from './comment.model';

interface IPostCreatingAttributes {
  title: string;
  content: string;
}

@Table
export class Post extends Model<Post, IPostCreatingAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  slug: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  description: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  content: string;

  @HasMany(() => PostComment)
  comments: PostComment[];
}
