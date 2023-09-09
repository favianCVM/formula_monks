import React from 'react';
import {PostComment} from '../../views/PostDetails';
import {CommentCard} from './CommentCard';
import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';
import {Dimensions} from 'react-native';
import {normalize} from '../../libs/normalizeSize';
import {Title} from '../fragments/Title';

interface CommentsBoxProps {
  comments: Array<PostComment>;
}

const CommentsBox = React.memo(({comments}: CommentsBoxProps) => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: normalize(15),
        }}
        data={comments}
        keyExtractor={({id}) => `post-comment-${id}`}
        renderItem={({item}) => <CommentCard {...item} />}
      />
    </GestureHandlerRootView>
  );
});

export {CommentsBox};
