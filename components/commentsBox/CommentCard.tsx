import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '../fragments/Text';
import {COLORS} from '../../styles/colors';
import {PostComment} from '../../store/reducers/posts';

interface CommentCardProps extends Partial<PostComment> {}

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS.text,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    padding: 8,
  },
  separator: {
    backgroundColor: COLORS.text,
    height: 1,
    marginVertical: 4,
  },
});

const CommentCard = React.memo(({body, email}: CommentCardProps) => {
  return (
    <View testID="CommentCardElement" style={styles.container}>
      <Text testID="CommentCardEmail">{email}</Text>
      <View style={styles.separator}></View>
      <Text testID="CommentCardBody">{body}</Text>
    </View>
  );
});

export {CommentCard};
