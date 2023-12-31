import { configureStore } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import serviceSlice from './serviceSlice';

const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_API_URL }),
  tagTypes: ['Articles', 'Article', 'User'],
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: (page) => {
        let offset = (page - 1) * 5;
        if (offset < 0) offset = 0;
        let token = store.getState().service.authToken;
        return {
          url: `articles?limit=5&offset=${offset}`,
          headers: {
            Authorization: token && `Bearer ${token}`,
          },
        };
      },
      providesTags: (page) => [{ type: 'Articles', page }],
    }),
    getArticle: builder.query({
      query: (slug) => {
        let token = store.getState().service.authToken;
        return {
          url: `articles/${slug}`,
          headers: {
            Authorization: token && `Bearer ${token}`,
          },
        };
      },
      providesTags: (slug) => [{ type: 'Article', slug }],
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: 'user',
        headers: {
          Authorization: `Bearer ${store.getState().service.authToken}`,
        },
      }),
      providesTags: () => [{ type: 'User' }],
    }),
    newUser: builder.mutation({
      query: ({ username, email, password }) => ({
        url: 'users',
        method: 'POST',
        body: { user: { username, email, password } },
      }),
      invalidatesTags: ['User'],
    }),
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: 'users/login',
        method: 'POST',
        body: {
          user: {
            email,
            password,
          },
        },
      }),
      invalidatesTags: ['User'],
    }),
    editProfile: builder.mutation({
      query: ({ username, email, image }) => ({
        url: 'user',
        headers: {
          Authorization: `Bearer ${store.getState().service.authToken}`,
        },
        method: 'PUT',
        body: {
          user: {
            username,
            email,
            image,
          },
        },
      }),
      invalidatesTags: ['User'],
    }),
    newArticle: builder.mutation({
      query: ({ title, description, body, tagList }) => ({
        url: 'articles',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${store.getState().service.authToken}`,
        },
        body: { article: { title, description, body, tagList } },
      }),
      invalidatesTags: ['Articles'],
    }),
    editArticle: builder.mutation({
      query: ({ title, description, body, slug }) => ({
        url: `articles/${slug}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${store.getState().service.authToken}`,
        },
        body: { article: { title, description, body } },
      }),
      invalidatesTags: ['Articles', 'Article'],
    }),
    deleteArticle: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${store.getState().service.authToken}`,
        },
      }),
      invalidatesTags: ['Articles'],
    }),
    favoriteArticle: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${store.getState().service.authToken}`,
        },
      }),
      invalidatesTags: ['Articles', 'Article'],
    }),
    unFavoriteArticle: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${store.getState().service.authToken}`,
        },
      }),
      invalidatesTags: ['Articles', 'Article'],
    }),
  }),
});

export const { setToken, setUserName } = serviceSlice.actions;

export const useLazyArticleListQuery = blogApi.endpoints.getArticles.useLazyQuery;
export const useArticleListQuery = blogApi.endpoints.getArticles.useQuery;
export const useArticleQuery = blogApi.endpoints.getArticle.useQuery;
export const useCurrentUserQuery = blogApi.endpoints.getCurrentUser.useQuery;

export const {
  useLoginUserMutation,
  useNewUserMutation,
  useEditProfileMutation,
  useNewArticleMutation,
  useEditArticleMutation,
  useDeleteArticleMutation,
  useFavoriteArticleMutation,
  useUnFavoriteArticleMutation,
} = blogApi;

export const store = configureStore({
  reducer: {
    service: serviceSlice.reducer,
    blogApi: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware),
});
