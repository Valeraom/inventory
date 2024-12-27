import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { Paths } from './enums';

import {
  OrdersPage,
  ProductsPage,
  GroupsPage,
  UsersPage,
  SettingsPage,
} from './pages';
import App from './App';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path={Paths.HOME} element={<App />}>
          <Route path={Paths.ORDERS} element={<OrdersPage />} />
          <Route path={Paths.GROUPS} element={<GroupsPage />} />
          <Route path={Paths.PRODUCTS} element={<ProductsPage />} />
          <Route path={Paths.USERS} element={<UsersPage />} />
          <Route path={Paths.SETTINGS} element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
