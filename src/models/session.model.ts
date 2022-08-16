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

interface ISessionAttributes {
  userId: string;
  tokenId: string;
}

@Table
export class Session extends Model<Session, ISessionAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.UUID })
  tokenId: string;
}
