import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../index"
export interface Post {
  userId: string;
  id: number;
  title: string;
  body: string;
}

export interface Rating {
  id: Post['id'],
  value: number;
}
interface PostsState {
  favorites: Array<Post['id']>;
  ratings: Array<Rating>;
  posts: Array<Post>;
}

const initialState: PostsState = {
  favorites: [],
  ratings: [],
  posts: []
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, { payload }: PayloadAction<Array<Post>>) => {
      state.posts = [...payload]
    },
    filterFavoritePosts: (state) => {
      state.posts = [...state.posts.filter(({ id }) => state.favorites.includes(id))]
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
      const existingRating = state.ratings.findIndex(({ id }) => id === payload.id);

      if (typeof existingRating === "number") {
        const newRatings = [...state.ratings];
        newRatings.splice(existingRating, 1, payload)
        state.ratings = [...newRatings];
      } else {
        state.ratings = [...state.ratings, payload];
      }
    },
  },
});

export const { addFavorite, removeFavorite, setPosts, filterFavoritePosts, addPostRating } = postsSlice.actions;

export const getPostRating = createSelector(
  (state: RootState, postId: number) => state.posts.ratings.find(({ id }) => id === postId) || { value: 0, id: postId },
  postState => postState,
);

export default postsSlice.reducer;
