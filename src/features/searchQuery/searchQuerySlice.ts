import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface searchQueryState {
  searchQuery: {
    products: string;
    orders: string;
  };
}

const initialState: searchQueryState = {
  searchQuery: {
    products: '',
    orders: '',
  },
};

export const searchQuerySlice = createSlice({
  name: 'searchQuery',
  initialState,
  reducers: {
    addProductsSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery.products = action.payload;
    },
    addOrdersSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery.orders = action.payload;
    },
  },
});

export const { addProductsSearchQuery, addOrdersSearchQuery } =
  searchQuerySlice.actions;
export default searchQuerySlice.reducer;
