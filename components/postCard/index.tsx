import React from 'react';
import {removePost} from '../../store/reducers/posts';
import {Pressable, StyleSheet, Text} from 'react-native';
import {COLORS} from '../../styles/colors';
import {useAppDispatch} from '../../hooks';
import {addFavorite, removeFavorite} from '../../store/reducers/posts';
import {normalize} from '../../libs/normalizeSize';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {Post} from '../../types';

interface PostCardProps extends Post {
  handleDetailsRedirection?: (
    postId: Post['id'],
    userId: Post['userId'],
  ) => void;
  isFavorite?: boolean;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 5,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: COLORS.text,
    borderWidth: 1,
  },
  pressedContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.blue,
    paddingHorizontal: 6,
    paddingVertical: 5,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: COLORS.text,
    borderWidth: 1,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    fontSize: normalize(20),
    color: COLORS.text,
  },
  iconButton: {
    paddingVertical: 4,
    paddingHorizontal: 0,
    marginLeft: 4,
    borderRadius: 5,
  },
});

const PostCard = React.memo(
  ({
    title,
    id,
    userId,
    handleDetailsRedirection,
    isFavorite,
  }: PostCardProps) => {
    const dispatch = useAppDispatch();

    const handleFavoriteToggle = () => {
      dispatch(isFavorite ? removeFavorite(id) : addFavorite(id));
    };

    const handleDeletePost = () => {
      if (isFavorite) {
        dispatch(removeFavorite(id));
      }
      dispatch(removePost(id));
    };

    return (
      <Pressable
        testID="PostCardElement"
        style={({pressed}) =>
          pressed ? styles.pressedContainer : styles.container
        }
        onPress={() =>
          handleDetailsRedirection && handleDetailsRedirection(id, userId)
        }>
        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.title}>
          {title}
        </Text>
        <Pressable onPress={handleDeletePost}>
          <Icon
            style={styles.iconButton}
            testID="PostCardDeletePressable"
            size={35}
            name="trash-can"
            color={COLORS.text}
          />
        </Pressable>

        <Pressable onPress={handleFavoriteToggle}>
          <Icon
            style={styles.iconButton}
            testID="PostCardFavoritePressable"
            size={35}
            name="heart"
            color={isFavorite ? COLORS.red : COLORS.text}
          />
        </Pressable>
      </Pressable>
    );
  },
);

export {PostCard};
