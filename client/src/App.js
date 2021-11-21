import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./components/screens/home/Home.jsx";
import PrivateRouting from './components/routing/PrivateRouting';
import routes from './components/routing/routes';
import Login from './components/screens/auth/login/Login';
function App() {
  return (
    <Router>
      <Switch>
        <PrivateRouting component={Home} path="/" />
        {routes.map(route => {
          return <Route exact path={route.path} component={route.component} />
        })}
      </Switch>
    </Router>
  );
}

export default App;
