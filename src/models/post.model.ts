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
import { ApiProperty } from '@nestjs/swagger';

interface IPostCreatingAttributes {
  title: string;
  content: string;
}

@Table
export class Post extends Model<Post, IPostCreatingAttributes> {
  @ApiProperty({
    example: 'dbf53edc-7a8c-4ec5-9675-df06fd5e8171',
    description: 'Unique id of record'
  })
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id: string;

  @ApiProperty({
    example: 'How JS runs the world',
    description: 'Title of post'
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  title: string;

  @ApiProperty({
    example: 'how-js-runs-the-world',
    description: 'Slug of post for URL'
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  slug: string;

  @ApiProperty({
    example: 'Today we well talk more about JS',
    description: 'Short description of the post'
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  description: string;

  @ApiProperty({
    example: 'Blah... Blah... Blah...',
    description: 'Post content'
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  content: string;

  @HasMany(() => PostComment)
  comments: PostComment[];
}
