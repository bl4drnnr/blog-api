import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface UserCreatingAttributes {
  email: string;
  password: string;
}

@Table
export class UserModel extends Model<UserModel, UserCreatingAttributes> {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique uuid of record'
  })
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @ApiProperty({
    example: 'user@domain.com',
    description: 'Email of user'
  })
  @Column(DataType.STRING)
  email: string;

  @ApiProperty({
    example: '1@qWasdf',
    description: 'Password of user'
  })
  @Column(DataType.STRING)
  password: string;
}
