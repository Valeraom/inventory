import { useDispatch, useSelector } from 'react-redux';
import {
  addOrder,
  addProductsToOrder,
  removeOrder,
  removeProduct,
} from '../features/orders/ordersSlice';
import { Order, Product } from '../types';
import { AppDispatch, RootState } from '../app/store';

export const useOrders = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const dispatch = useDispatch<AppDispatch>();

  const onAddOrder = (order: Order) => {
    dispatch(addOrder(order));
  };

  const onRemoveOrder = (id: number) => {
    dispatch(removeOrder(id));
  };

  const onAddProducts = (orderId: number, products: Product[]) => {
    dispatch(addProductsToOrder({ orderId, products }));
  };

  const onRemoveProduct = (orderId: number, productId: number) => {
    dispatch(removeProduct({ orderId, productId }));
  };

  return { orders, onAddOrder, onRemoveOrder, onAddProducts, onRemoveProduct };
};
