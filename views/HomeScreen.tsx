import React from 'react';
import {Skeleton} from 'react-native-skeleton-loaders';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {useAppSelector, useAppDispatch} from '../hooks';
import {RootStackParamList} from '../components/routing/type';
import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';
import {PostCard} from '../components/postCard';
import {ViewLayout} from '../components/layout/ViewLayout';
import {useBoolean} from '../hooks/useBoolean';
import {Title} from '../components/fragments/Title';
import {normalize} from '../libs/normalizeSize';
import {displayErrorMessage} from '../libs/displayErrorToast';
import {View, Dimensions} from 'react-native';
import {COLORS} from '../styles/colors';
import {setPosts, filterFavoritePosts} from '../store/reducers/posts';
import {useNetInfo} from '@react-native-community/netinfo';

import {ActionButton} from '../components/actionButton';
import {Post} from '../types';

type HomeScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export const HomeScreen = ({navigation}: HomeScreenNavigationProp) => {
  const [isLoading, setIsLoading] = useBoolean(false);
  const favorites = useAppSelector(state => state.posts.favorites);
  const posts = useAppSelector(state => state.posts.posts);
  const dispatch = useAppDispatch();

  const netInfo = useNetInfo();

  const handleFetchPosts = (signal: AbortSignal) => {
    setIsLoading(true);

    fetch('https://jsonplaceholder.typicode.com/posts', {signal})
      .then(response => response.json())
      .then(data => dispatch(setPosts(data as Post[])))
      .catch(error => displayErrorMessage(error.message))
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    const controller = new AbortController();
    const {signal} = controller;

    if (netInfo.isInternetReachable && !posts.length) handleFetchPosts(signal);

    return () => {
      controller.abort();
    };
  }, [netInfo, posts.length]);

  const handlePostDetailsRedirection = React.useCallback(
    (postId: Post['id'], userId: Post['userId']) => {
      navigation.navigate('PostDetails', {
        postId,
        userId,
      });
    },
    [navigation],
  );

  const handleFilterFavorites = React.useCallback(() => {
    dispatch(filterFavoritePosts());
  }, [filterFavoritePosts, dispatch]);

  const handleReloadPosts = React.useCallback(() => {
    const controller = new AbortController();
    const {signal} = controller;
    handleFetchPosts(signal);

    navigation.addListener('beforeRemove', () => {
      controller.abort();
    });
  }, [dispatch]);

  return (
    <ViewLayout>
      <Title style={{marginBottom: 12}}>Favorites: {favorites.length} </Title>

      <View
        style={{
          flexDirection: 'row',
          marginBottom: normalize(6),
          padding: normalize(24),
          gap: 10,
        }}>
        <ActionButton onPress={handleFilterFavorites} icon="magnifying-glass">
          clean non favorites
        </ActionButton>
        <ActionButton onPress={handleReloadPosts} icon="arrow-down">
          reload posts
        </ActionButton>
      </View>

      {isLoading ? (
        <View style={{alignItems: 'center'}}>
          {Array.from(Array(Math.floor(SCREEN_HEIGHT / 50)).keys()).map(el => (
            <Skeleton
              key={`skeleton-${el}`}
              mY={8}
              color={COLORS.seaBook}
              bR={4}
              w={SCREEN_WIDTH * 0.95}
              h={50}
            />
          ))}
        </View>
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
