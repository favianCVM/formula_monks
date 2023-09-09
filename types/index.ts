export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Rating {
  id: Post['id'];
  value: number;
}

export interface PostComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface AuthorInformation {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

export interface PostDetails {
  id: Post['id'];
  author: AuthorInformation;
  comments: Array<PostComment>;
}
