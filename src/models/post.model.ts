import { Model } from 'sequelize-typescript';

interface PostCreatingAttributes {
  title: string;
  content: string;
}

export class PostModel extends Model<PostModel, PostCreatingAttributes> {
  //
}
