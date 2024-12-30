export const getOrders = () => {
  return fetch('/api/orders.json')
    .then(res => res.json())
    .catch(() => console.error('Request error'));
};
