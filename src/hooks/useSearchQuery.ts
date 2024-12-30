import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import {
  addOrdersSearchQuery,
  addProductsSearchQuery,
} from '../features/searchQuery/searchQuerySlice';

export const useSeacrhQuery = () => {
  const searchQuery = useSelector(
    (state: RootState) => state.searchQuery.searchQuery,
  );
  const dispatch = useDispatch<AppDispatch>();

  const onAddProductsSearchQuery = (searchQuery: string) => {
    dispatch(addProductsSearchQuery(searchQuery));
  };

  const onAddOrdersSearchQuery = (searchQuery: string) => {
    dispatch(addOrdersSearchQuery(searchQuery));
  };

  return { searchQuery, onAddOrdersSearchQuery, onAddProductsSearchQuery };
};
