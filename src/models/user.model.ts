import {
  BelongsToMany,
  Column,
  DataType,
  Default,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import { Session } from './session.model';
import { Role } from './role.model';
import { UserRole } from './user-role.model';
import { Ban } from './ban.model';
import { PostComment } from './comment.model';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

interface IUserCreatingAttributes {
  email: string;
  password: string;
}

@Exclude()
@Table
export class User extends Model<User, IUserCreatingAttributes> {
  @ApiProperty({
    example: 'dbf53edc-7a8c-4ec5-9675-df06fd5e8171',
    description: 'Unique id of record'
  })
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  @Expose()
  id: string;

  @ApiProperty({ example: 'user@domain.com', description: 'User email' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  @Expose()
  email: string;

  @ApiProperty({
    example: '$2a$05$RKwG.Ie5hMKmC1vOw4rkCO9fKnHc5JFV1SfsiJSNJzwQzji7U7lfu',
    description: 'User password encrypted by bcryptjs library'
  })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'bl4drnnr', description: 'Username' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  @Expose()
  username: string;

  @ApiProperty({ example: 'John', description: 'First name' })
  @Column({ type: DataType.STRING, allowNull: true })
  @Expose()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  @Column({ type: DataType.STRING, allowNull: true })
  @Expose()
  lastName: string;

  @HasOne(() => Session)
  session: Session;

  @HasOne(() => Ban)
  ban: Ban;

  @HasMany(() => PostComment)
  comments: PostComment[];

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}
