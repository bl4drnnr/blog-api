import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey
} from 'sequelize-typescript';

interface UserCreatingAttributes {
  email: string;
  password: string;
}

export class UserModel extends Model<UserModel, UserCreatingAttributes> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  password: string;
}
