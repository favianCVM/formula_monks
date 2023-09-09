import React from 'react';
import {View, Dimensions} from 'react-native';
import {Skeleton} from 'react-native-skeleton-loaders';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../components/routing/type';
import {Text} from '../components/fragments/Text';
import {useBoolean} from '../hooks/useBoolean';
import {ViewLayout} from '../components/layout/ViewLayout';
import {Title} from '../components/fragments/Title';
import {CommentsBox} from '../components/commentsBox';
import {AuthorCard} from '../components/authorCard';
//@ts-ignore
import {AccordionList} from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
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

type PostDetailsNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'PostDetails'
>;

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export const PostDetails = ({route}: PostDetailsNavigationProp) => {
  const postId = React.useMemo(() => route.params.postId, [route.params]);
  const userId = React.useMemo(
    () => parseInt(route.params.userId),
    [route.params],
  );

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

  if (isLoading)
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

  return (
    <ViewLayout>
      {/* @ts-ignore */}
      <Title style={{marginBottom: 4}}>{post.title}</Title>
      <StarRating
        style={{alignSelf: 'center'}}
        rating={rating.value}
        color={COLORS.yellow}
        onChange={handleChangeRating}
      />
      <Text style={{padding: 24}}>
        <Text style={{fontWeight: 'bold', fontSize: 28}}>“</Text>
        {/* @ts-ignore */}
        {post.body}
        <Text style={{fontWeight: 'bold', fontSize: 28}}>”</Text>
      </Text>

      {postDetails ? (
        <>
          <AccordionList
            list={[
              {
                id: 1,
                title: 'Author information',
                body: <AuthorCard {...postDetails.author} />,
              },
              {
                id: 2,
                title: 'Comments',
                body: <CommentsBox comments={postDetails.comments} />,
              },
            ]}
            header={({title}: {title: string}) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: COLORS.text,
                  borderWidth: 1,
                  paddingVertical: 12,
                }}>
                <Icon
                  name={title === 'Author information' ? 'user' : 'message'}
                  size={20}
                  style={{
                    marginRight: 20,
                    padding: 8,
                    backgroundColor: COLORS.yellow,
                    borderRadius: 12,
                  }}
                />
                <Title style={{fontSize: 20}}>{title}</Title>
              </View>
            )}
            body={({body}: {body: JSX.Element}) => (
              <View style={{paddingVertical: 12, backgroundColor: COLORS.gray}}>
                {body}
              </View>
            )}
          />
        </>
      ) : (
        <NoNetConnection />
      )}
    </ViewLayout>
  );
};
