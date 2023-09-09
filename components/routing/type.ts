import {Post} from '../../types';

export type RootStackParamList = {
  Home: undefined;
  PostDetails: {
    postId: Post['id'];
    userId: Post['userId'];
  };
};
