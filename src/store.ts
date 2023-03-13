import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { itemApi } from "./services/api-service";

export const store = configureStore({
  reducer: {
    [itemApi.reducerPath]: itemApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itemApi.middleware),
});

export const { useGetItemsQuery, useUpdateItemMutation } = itemApi;

setupListeners(store.dispatch);
