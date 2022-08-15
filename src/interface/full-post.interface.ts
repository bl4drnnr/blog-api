import { Post } from '../models/post.model';
import { PostComment } from '../models/comment.model';

export interface IFullPost {
  post: Post;
  postComments: PostComment[];
}
