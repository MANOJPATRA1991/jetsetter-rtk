import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const itemApi = createApi({
  reducerPath: 'itemsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  keepUnusedDataFor: 60,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['Item'],
  endpoints: (builder) => ({
    getItems: builder.query<{ items: Item[] }, void>({
      query: () => 'items',
      providesTags: ['Item'],
    }),
    updateItem: builder.mutation<Item, Partial<Item> & Pick<Item, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: `items/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      transformResponse: (response: { data: Item }, meta, arg) => response.data,
      transformErrorResponse: (
        response: { status: string | number },
        meta,
        arg,
      ) => response.status,
      invalidatesTags: ['Item'],
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry },
      ) {},
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          cacheEntryRemoved,
          cacheDataLoaded,
          getCacheEntry,
        },
      ) {},
    }),
  }),
});
