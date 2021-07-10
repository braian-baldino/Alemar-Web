import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Layout/Header';
import Nav from './components/Layout/Nav';
import RouterLinks from './components/Router/RouterLinks';

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Nav />
      <RouterLinks />
    </BrowserRouter>
  );
}

export default App;
