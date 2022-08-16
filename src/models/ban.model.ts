import {
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript';
import { User } from './user.model';

interface IBanAttributes {
  userId: string;
  reason: string;
}

@Table
export class Ban extends Model<Ban, IBanAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  id: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @Column({ type: DataType.STRING })
  reason: string;
}
