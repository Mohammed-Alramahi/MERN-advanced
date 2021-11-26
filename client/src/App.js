import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./components/screens/home/Home.jsx";
import PrivateRouting from './components/routing/PrivateRouting';
import routes from './components/routing/routes';
import { CssBaseline } from '@mui/material';
import Header from './components/screens/main/Header';
import Footer from './components/screens/main/Footer';
function App() {
  return (
    <>
      <main>
        <Router>
          <CssBaseline />

          <Header />
          <PrivateRouting component={Home} path="/" />
          <Switch>

            {routes.map(route => {
              return <Route exact path={route.path} component={route.component} />
            })}
          </Switch>

        </Router>

      </main>
      <Footer />
    </>
  );
}

export default App;
