import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, Product } from '../../types';

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

export const ordersSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    loadOrders(state, action: PayloadAction<Order[]>) {
      return {
        ...state,
        orders: action.payload,
      };
    },
    addOrder(state, action: PayloadAction<Order>) {
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    },
    removeOrder(state, action: PayloadAction<number>) {
      return {
        ...state,
        orders: state.orders.filter(order => order.id !== action.payload),
      };
    },
    addProductsToOrder(
      state,
      action: PayloadAction<{ orderId: number; products: Product[] }>,
    ) {
      const { orderId, products } = action.payload;

      return {
        ...state,
        orders: state.orders.map(order => {
          if (order.id === orderId) {
            return {
              ...order,
              products: [...order.products, ...products],
            };
          }
          return order;
        }),
      };
    },
    removeProduct(
      state,
      action: PayloadAction<{ orderId: number; productId: number }>,
    ) {
      const { orderId, productId } = action.payload;

      return {
        ...state,
        orders: state.orders.map(order => {
          if (order.id === orderId) {
            return {
              ...order,
              products: order.products.filter(
                product => product.id !== productId,
              ),
            };
          }
          return order;
        }),
      };
    },
  },
});

export const {
  loadOrders,
  addOrder,
  removeOrder,
  addProductsToOrder,
  removeProduct,
} = ordersSlice.actions;
export default ordersSlice.reducer;
