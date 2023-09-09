import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { Post, PostDetails, Rating } from '../../types';

interface PostsReducerState {
  favorites: Array<Post['id']>;
  ratings: Array<Rating>;
  posts: Array<Post>;
  postDetails: Array<PostDetails>;
}

const initialState: PostsReducerState = {
  favorites: [],
  ratings: [],
  posts: [],
  postDetails: [],
};

export const postPlaceholder = {
  body: '',
  title: '',
};

export const postDetailsPlaceholder = {
  author: {
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
  },
  comments: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, { payload }: PayloadAction<Array<Post>>) => {
      state.posts = [...payload];
    },
    removePost: (state, { payload }: PayloadAction<Post['id']>) => {
      state.posts = [...state.posts.filter(({ id }) => id !== payload)];
    },
    filterFavoritePosts: state => {
      state.posts = [
        ...state.posts.filter(({ id }) => state.favorites.includes(id)),
      ];
      state.postDetails = [
        ...state.postDetails.filter(({ id }) => state.favorites.includes(id)),
      ];
    },
    addFavorite: (state, { payload }: PayloadAction<Post['id']>) => {
      state.favorites = [...state.favorites, payload];
    },
    removeFavorite: (state, { payload }: PayloadAction<Post['id']>) => {
      const newFavorites = [...state.favorites];
      newFavorites.splice(state.favorites.indexOf(payload), 1);
      state.favorites = [...newFavorites];
    },
    addPostRating: (state, { payload }: PayloadAction<Rating>) => {
      const existingRating = state.ratings.findIndex(
        ({ id }) => id === payload.id,
      );

      if (typeof existingRating === 'number' && existingRating >= 0) {
        const newRatings = [...state.ratings];
        newRatings.splice(existingRating, 1, payload);
        state.ratings = [...newRatings];
      } else {
        state.ratings = [...state.ratings, payload];
      }
    },
    savePostDetails: (state, { payload }: PayloadAction<PostDetails>) => {
      const existingDetails = state.ratings.findIndex(
        ({ id }) => id === payload.id,
      );

      if (typeof existingDetails === 'number' && existingDetails >= 0) {
        const newDetails = [...state.postDetails];
        newDetails.splice(existingDetails, 1, payload);
        state.postDetails = [...newDetails];
      } else {
        state.postDetails = [...state.postDetails, payload];
      }
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  setPosts,
  filterFavoritePosts,
  addPostRating,
  removePost,
  savePostDetails,
} = postsSlice.actions;

export const getPostRating = createSelector(
  (state: RootState, postId: number) =>
    state.posts.ratings.find(({ id }) => id === postId) || { value: 0, id: postId },
  postState => postState,
);

export const getPostDetails = createSelector(
  (state: RootState, postId: number) =>
    state.posts.postDetails.find(({ id }) => id === postId),
  postState => postState,
);

export const getPost = createSelector(
  (state: RootState, postId: number) =>
    state.posts.posts.find(({ id }) => id === postId),
  postState => postState,
);

export default postsSlice.reducer;
