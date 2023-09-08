import React from 'react';
import {Skeleton} from 'react-native-skeleton-loaders';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useAppSelector} from '../hooks';
import {RootStackParamList} from '../components/routing/type';
import {Post} from '../store/reducers/posts';
import Toast from 'react-native-toast-message';
import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';
import {PostCard} from '../components/postCard';
import {ViewLayout} from '../components/layout/ViewLayout';
import {useBoolean} from '../hooks/useBoolean';
import {Title} from '../components/fragments/Title';
import {normalize} from '../libs/normalizeSize';

type HomeScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

export const HomeScreen = ({navigation}: HomeScreenNavigationProp) => {
  const [posts, setPosts] = React.useState<Array<Post>>([]);
  const [isLoading, setIsLoading] = useBoolean(false);
  const favorites = useAppSelector(state => state.posts.favorites);

  React.useEffect(() => {
    const controller = new AbortController();
    const {signal} = controller;

    setIsLoading(true);
    fetch('https://jsonplaceholder.typicode.com/posts', {signal})
      .then(response => response.json())
      .then(data => setPosts(data as Post[]))
      .catch(() =>
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
          text2: 'Please try again',
          position: 'bottom',
        }),
      )
      .finally(() => setIsLoading(false));

    return () => {
      controller.abort();
    };
  }, []);

  const handlePostDetailsRedirection = React.useCallback(
    (postId: Post['id']) => {
      navigation.navigate('PostDetails', {
        postId,
      });
    },
    [navigation],
  );

  return (
    <ViewLayout>
      <Title style={{marginBottom: 12}}>Favorites: {favorites.length} </Title>

      {isLoading ? (
        <>
          <Skeleton color="pink" bR={4} w={200} h={49} />
        </>
      ) : (
        <GestureHandlerRootView style={{flex: 1}}>
          <FlatList
            data={[...posts].sort(a => (favorites.includes(a.id) ? -1 : 1))}
            contentContainerStyle={{
              paddingHorizontal: normalize(15),
            }}
            keyExtractor={({id}) => `post-${id}`}
            renderItem={({item}) => (
              <PostCard
                isFavorite={favorites.includes(item.id)}
                handleDetailsRedirection={handlePostDetailsRedirection}
                {...item}
              />
            )}
          />
        </GestureHandlerRootView>
      )}
    </ViewLayout>
  );
};
