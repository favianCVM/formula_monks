import {Post} from '../../store/reducers/posts';

// type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export type RootStackParamList = {
  Home: undefined;
  PostDetails: {
    postId: Post['id'];
    userId: Post['userId'];
  };
};
