export const getOrders = () => {
  return fetch('public/api/orders.json')
    .then(res => res.json())
    .catch(() => console.error('Request error'));
};

export const getProducts = () => {
  return fetch('public/api/products.json')
    .then(res => res.json())
    .catch(() => console.error('Request error'));
};
