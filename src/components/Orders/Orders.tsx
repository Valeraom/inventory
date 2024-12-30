import { useState } from 'react';
import { OrderItem } from '../Order/OrderItem';
import { Order } from '../../types';
import './Orders.scss';
import cn from 'classnames';
import { OrderInfo } from '../OrderInfo';
import { useOrders } from '../../hooks/useOrders';

export const Orders = () => {
  const { orders } = useOrders();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <div className={cn('orders')}>
      <div className={cn('orders__list')}>
        {orders.map(order => (
          <OrderItem
            key={order.id}
            order={order}
            selectedOrderId={selectedOrder?.id}
            onSelect={() => setSelectedOrder(order)}
            onClose={() => setSelectedOrder(null)}
          />
        ))}
      </div>

      {selectedOrder && (
        <div className="orders__order-info">
          <OrderInfo
            selectedOrder={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        </div>
      )}
    </div>
  );
};
