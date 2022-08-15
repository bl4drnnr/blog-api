import { Post } from '../models/post.model';

export interface IPostPreview {
  rows: Post[];
  count: number;
}
