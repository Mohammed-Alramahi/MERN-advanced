import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './components/routing/routes';
function App() {
  return (
    <Router>
      <Routes>
        {routes.map(route => {
          return <Route path={route.path} element={route.element} />
        })}
      </Routes>
    </Router>
  );
}

export default App;
