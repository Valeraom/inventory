import { configureStore } from '@reduxjs/toolkit';

import ordersReducer from '../features/orders/ordersSlice';
import searchQueryReducer from '../features/searchQuery/searchQuerySlice';

const store = configureStore({
  reducer: {
    orders: ordersReducer,
    searchQuery: searchQueryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
