export interface Post {
  id: string;
  user_id: string;
  title: string;
  body: string;
  created_at: string;
}
export interface NewPost {
  title: string;
  body: string;
  user_id: string;
}