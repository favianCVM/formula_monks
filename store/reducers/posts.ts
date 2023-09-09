import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  rating: Array<Rating>;
  posts: Array<Post>;
}

const initialState: PostsState = {
  favorites: [],
  rating: [],
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
  },
});

export const { addFavorite, removeFavorite, setPosts, filterFavoritePosts } = postsSlice.actions;

export default postsSlice.reducer;
