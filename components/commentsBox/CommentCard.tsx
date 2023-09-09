import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '../fragments/Text';
import {PostComment} from '../../views/PostDetails';
import {COLORS} from '../../styles/colors';

interface CommentCardProps extends PostComment {}

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

const CommentCard = React.memo(({body, email, id, name}: CommentCardProps) => {
  return (
    <View style={styles.container}>
      <Text>{email}</Text>
      <View style={styles.separator}></View>
      <Text>{body}</Text>
    </View>
  );
});

export {CommentCard};
