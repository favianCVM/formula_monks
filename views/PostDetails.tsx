import React from 'react';
import {View} from 'react-native';
import {Skeleton} from 'react-native-skeleton-loaders';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useAppSelector} from '../hooks';
import {RootStackParamList} from '../components/routing/type';
import {Text} from '../components/fragments/Text';
import {useBoolean} from '../hooks/useBoolean';
import {Post} from '../store/reducers/posts';
import Toast from 'react-native-toast-message';
import {ViewLayout} from '../components/layout/ViewLayout';
import {Title} from '../components/fragments/Title';

type PostDetailsNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'PostDetails'
>;

export const PostDetails = ({route}: PostDetailsNavigationProp) => {
  const postId = React.useMemo(() => route.params.postId, [route.params]);
  const [isLoading, setIsLoading] = useBoolean(false);
  const [postDetails, setPostDetails] = React.useState<Omit<Post, 'id'>>({
    body: '',
    title: '',
    userId: '',
  });

  const init = async (signal: AbortSignal) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        {signal},
      );
      const data = await response.json();
      setPostDetails(data as Post);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: 'Please try again',
        position: 'bottom',
      });
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    const controller = new AbortController();
    const {signal} = controller;

    init(signal);

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <ViewLayout>
      <Title style={{marginBottom: 12}}>{postDetails.title}</Title>
      <Title style={{marginTop: 0}}>post: {postId}</Title>
      <Text style={{padding: 24}}>{postDetails.body}</Text>
    </ViewLayout>
  );
};
