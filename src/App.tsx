import { Outlet } from 'react-router-dom';

import './assets/styles/_reset.scss';
import './assets/styles/_normalize.scss';
import './App.css';
import { NavigationMenu, TopMenu } from './components';

function App() {
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
        <div className="col-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
