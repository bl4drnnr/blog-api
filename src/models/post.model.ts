import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface PostCreatingAttributes {
  title: string;
  content: string;
}

@Table
export class PostModel extends Model<PostModel, PostCreatingAttributes> {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique uuid of record'
  })
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ApiProperty({
    example: 'Everything you need to know about ES6',
    description: 'Title of the post'
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  title: string;

  @ApiProperty({
    example: 'everything-you-need-to-know-about-es6',
    description: 'Slug of the post (converted name for URL)'
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  slug: string;

  @ApiProperty({
    example: 'Here where content goes...',
    description: 'Content of the post'
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  content: string;
}
