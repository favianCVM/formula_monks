import React from 'react';
import {View, Dimensions} from 'react-native';
import {Skeleton} from 'react-native-skeleton-loaders';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../components/routing/type';
import {Text} from '../components/fragments/Text';
import {useBoolean} from '../hooks/useBoolean';
import {Post} from '../store/reducers/posts';
import {ViewLayout} from '../components/layout/ViewLayout';
import {Title} from '../components/fragments/Title';
import {CommentsBox} from '../components/commentsBox';
import {AuthorCard} from '../components/authorCard';
//@ts-ignore
import {AccordionList} from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {COLORS} from '../styles/colors';
import {displayErrorMessage} from '../libs/displayErrorToast';

type PostDetailsNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'PostDetails'
>;

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

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export const PostDetails = ({route}: PostDetailsNavigationProp) => {
  const postId = React.useMemo(() => route.params.postId, [route.params]);
  const userId = React.useMemo(
    () => parseInt(route.params.userId),
    [route.params],
  );

  const [isLoading, setIsLoading] = useBoolean(false);
  const [postDetails, setPostDetails] = React.useState<
    Omit<Post, 'id' | 'userId'>
  >({
    body: '',
    title: '',
  });
  const [comments, setComments] = React.useState<Array<PostComment>>([]);
  const [authorInformation, setAuthorInformation] = React.useState<
    Omit<AuthorInformation, 'id'>
  >({
    address: {
      city: '',
      street: '',
    },
    company: {
      name: '',
    },
    email: '',
    name: '',
    phone: '',
    username: '',
    website: '',
  });

  React.useEffect(() => {
    const controller = new AbortController();
    const {signal} = controller;

    setIsLoading(true);

    Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        signal,
      }).then(response => response.json()),
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
        signal,
      }).then(response => response.json()),
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        signal,
      }).then(response => response.json()),
    ])
      .then(([postDetails, comments, authorInformation]) => {
        setPostDetails(postDetails as Post);
        setComments(comments as Array<PostComment>);
        setAuthorInformation(authorInformation as AuthorInformation);
      })
      .catch(error => {
        displayErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <ViewLayout>
      {isLoading ? (
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
      ) : (
        <>
          <Title style={{marginBottom: 4}}>{postDetails.title}</Title>
          <Text style={{padding: 24}}>
            <Text style={{fontWeight: 'bold', fontSize: 28}}>“</Text>
            {postDetails.body}
            <Text style={{fontWeight: 'bold', fontSize: 28}}>”</Text>
          </Text>
          <AccordionList
            list={[
              {
                id: 1,
                title: 'Author information',
                body: <AuthorCard id={userId} {...authorInformation} />,
              },
              {
                id: 2,
                title: 'Comments',
                body: <CommentsBox comments={comments} />,
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
      )}
    </ViewLayout>
  );
};
