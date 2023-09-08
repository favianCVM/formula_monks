import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export interface Post {
  userId: string;
  id: number;
  title: string;
  body: string;
}

interface PostsState {
  favorites: Array<Post['id']>;
}

const initialState: PostsState = {
  favorites: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addFavorite: (state, { payload }: PayloadAction<Post['id']>) => {
      state.favorites = [...state.favorites, payload];
    },
    removeFavorite: (state, { payload }: PayloadAction<Post['id']>) => {
      const newFavorites = [...state.favorites];
      newFavorites.splice(state.favorites.indexOf(payload), 1);
      state.favorites = [...newFavorites]
    },
  },
});

export const { addFavorite, removeFavorite } = postsSlice.actions
export const selectFavorites = (state: RootState) => state.posts;

export default postsSlice.reducer;
