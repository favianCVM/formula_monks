import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {Skeleton} from 'react-native-skeleton-loaders';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../components/routing/type';
import {useBoolean} from '../hooks/useBoolean';
import {ViewLayout} from '../components/layout/ViewLayout';
import {Title} from '../components/fragments/Title';
import {COLORS} from '../styles/colors';
import {displayErrorMessage} from '../libs/displayErrorToast';
import StarRating from 'react-native-star-rating-widget';
import {useAppDispatch, useAppSelector} from '../hooks';
import {
  addPostRating,
  savePostDetails,
  getPostDetails,
  getPost,
  getPostRating,
} from '../store/reducers/posts';
import {useNetInfo} from '@react-native-community/netinfo';
import {NoNetConnection} from '../components/fragments/NoNetConnection';
import {DetailsAccordion} from '../components/detailsAccordion';
import {Quotes} from '../components/fragments/Quotes';

type PostDetailsNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'PostDetails'
>;

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const styles = StyleSheet.create({
  quotesSpacing: {
    paddingHorizontal: 22,
    marginVertical: 20,
  },
  titleSpacing: {marginBottom: 4},
  starsRatingSpacing: {
    alignSelf: 'center',
  },
});

export const PostDetails = ({route}: PostDetailsNavigationProp) => {
  const postId = React.useMemo(() => route.params.postId, [route.params]);
  const userId = React.useMemo(() => route.params.userId, [route.params]);

  const netInfo = useNetInfo();

  const dispatch = useAppDispatch();

  const rating = useAppSelector(state => getPostRating(state, postId));
  const postDetails = useAppSelector(state => getPostDetails(state, postId));
  const post = useAppSelector(state => getPost(state, postId));

  const [isLoading, setIsLoading] = useBoolean(true);

  React.useEffect(() => {
    const controller = new AbortController();
    const {signal} = controller;

    if (netInfo.isInternetReachable) {
      Promise.all([
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
          signal,
        }).then(response => response.json()),
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
          signal,
        }).then(response => response.json()),
      ])
        .then(([comments, authorInformation]) => {
          dispatch(
            savePostDetails({
              id: postId,
              comments,
              author: authorInformation,
            }),
          );
        })
        .catch(error => {
          displayErrorMessage(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else setIsLoading(false);

    return () => {
      controller.abort();
    };
  }, [netInfo.isInternetReachable]);

  const handleChangeRating = React.useCallback(
    (ratingValue: number) => {
      dispatch(
        addPostRating({
          id: postId,
          value: ratingValue,
        }),
      );
    },
    [dispatch, postId, addPostRating],
  );

  if (isLoading) {
    return (
      <ViewLayout>
        <View style={{alignItems: 'center'}}>
          <Skeleton
            mY={4}
            color={COLORS.seaBook}
            bR={4}
            w={SCREEN_WIDTH / 2}
            h={49}
          />
          <Skeleton
            mY={4}
            color={COLORS.seaBook}
            bR={4}
            w={SCREEN_WIDTH / 1.2}
            h={100}
          />
          <Skeleton
            mY={8}
            color={COLORS.seaBook}
            bR={4}
            w={SCREEN_WIDTH * 0.95}
            h={49}
          />
          <Skeleton
            mY={8}
            color={COLORS.seaBook}
            bR={4}
            w={SCREEN_WIDTH * 0.95}
            h={49}
          />
        </View>
      </ViewLayout>
    );
  }

  return (
    <ViewLayout>
      <Title style={styles.titleSpacing}>{post.title}</Title>
      <StarRating
        style={styles.starsRatingSpacing}
        rating={rating.value}
        color={COLORS.yellow}
        onChange={handleChangeRating}
      />

      <Quotes style={styles.quotesSpacing}>{post.body}</Quotes>

      {!postDetails.id && !netInfo.isInternetReachable ? (
        <NoNetConnection />
      ) : (
        <DetailsAccordion {...postDetails} />
      )}
    </ViewLayout>
  );
};
