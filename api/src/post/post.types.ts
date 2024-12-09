export interface IPost {
  id: number;
  user_id: number;
  title: string;
  content: string;
  image_path: string;
}

export interface IPostDTO {
  title: string;
  content: string;
  image_path: string;
}
