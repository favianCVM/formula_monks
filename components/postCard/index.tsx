import React from 'react';
import {Post} from '../../store/reducers/posts';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../styles/colors';
import {useAppDispatch} from '../../hooks';
import {addFavorite, removeFavorite} from '../../store/reducers/posts';
import {Title} from '../fragments/Title';
import {normalize} from '../../libs/normalizeSize';
import Icon from 'react-native-vector-icons/Ionicons';

interface PostCardProps extends Post {
  handleDetailsRedirection: (postId: Post['id']) => void;
  isFavorite: boolean;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  pressedContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'red',
    paddingVertical: 12,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    fontSize: normalize(20),
    color: COLORS.text,
  },
});

const PostCard = React.memo(
  ({
    body,
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

    return (
      <Pressable
        testID="PostCard"
        style={({pressed}) =>
          pressed ? styles.pressedContainer : styles.container
        }
        onPress={() => handleDetailsRedirection(id)}>
        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.title}>
          {title}
        </Text>
        <Pressable
          style={{
            backgroundColor: 'pink',
          }}
          testID="PostCardFavoritePressable"
          onPress={handleFavoriteToggle}>
          <Icon name="" />
        </Pressable>
      </Pressable>
    );
  },
);

export {PostCard};
