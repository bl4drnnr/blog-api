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

interface IUserCreatingAttributes {
  email: string;
  password: string;
}

@Exclude()
@Table
export class User extends Model<User, IUserCreatingAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  @Expose()
  id: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  @Expose()
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  @Expose()
  username: string;

  @Column({ type: DataType.STRING, allowNull: true })
  @Expose()
  firstName: string;

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
