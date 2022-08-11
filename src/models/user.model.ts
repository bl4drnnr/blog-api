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
import { ApiProperty } from '@nestjs/swagger';
import { Session } from './session.model';
import { Role } from './role.model';
import { UserRole } from './user-role.model';
import { UserBan } from './user-ban.model';
import { PostComment } from './comment.model';
import { Exclude } from 'class-transformer';

interface IUserCreatingAttributes {
  email: string;
  password: string;
}

@Table
export class User extends Model<User, IUserCreatingAttributes> {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique uuid of record'
  })
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id: string;

  @ApiProperty({
    example: 'user@domain.com',
    description: 'Email of user'
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @ApiProperty({
    example: '1@qWasdf',
    description: 'Password of user'
  })
  @Column({ type: DataType.STRING, allowNull: false })
  @Exclude({ toPlainOnly: true })
  password: string;

  @ApiProperty({
    example: 'bl4drnnr',
    description: 'Username of user'
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  username: string;

  @ApiProperty({
    example: 'John',
    description: 'First name (optional)'
  })
  @Column({ type: DataType.STRING, allowNull: true })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of user (optional)'
  })
  @Column({ type: DataType.STRING, allowNull: true })
  lastName: string;

  @HasOne(() => Session)
  session: Session;

  @HasOne(() => UserBan)
  ban: UserBan;

  @HasMany(() => PostComment)
  comments: PostComment[];

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}
