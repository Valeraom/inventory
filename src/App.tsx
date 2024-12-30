import { Outlet, useLocation } from 'react-router-dom';

import './assets/styles/_reset.scss';
import './assets/styles/_normalize.scss';
import './App.css';
import { NavigationMenu, TopMenu } from './components';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './app/store';
import { getOrders } from './api';
import { loadOrders } from './features/orders/ordersSlice';
import { useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const fetchOrders = () => {
    getOrders()
      .then(res => {
        dispatch(loadOrders(res));
      })
      .catch(() => console.error('Request error'));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <TopMenu />
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          <NavigationMenu />
        </div>
        <div className="main col-10">
          <TransitionGroup>
            <CSSTransition
              key={location.pathname}
              timeout={700}
              classNames="fade"
              unmountOnExit
            >
              <Outlet />
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
}

export default App;
