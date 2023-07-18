import './App.css';
import { Route, useLocation } from "react-router-dom" 
import Landing from "./views/landing/landing";
import Home from './views/home/home.component';
import CreateGame from './views/Form/createGame';
import Detail from './views/detail/detail.component';
import Nav from './views/navbar/nav';
import Footer from './views/footer/footer';
import Searchbar from './views/navbar/searchbar/searchbar';
import UpdateGame from './views/Form/Update/UpdateGame';


function App() {
  const location = useLocation();
  return (
    <div id="App">
      {location.pathname !== '/' && <Nav/>} 
      <Route exact path={'/'} component={ Landing } />
      <Route exact path={'/home'} component={ Home } />
      <Route exact path={'/games/:name'} component={ Searchbar } />
      <Route exact path={'/detail/:id'} component={ Detail } />
      <Route exact path={'/creategame'} component={ CreateGame } />
      <Route exact path={'/updategame/:id'} component={ UpdateGame } />
      {location.pathname !== '/' && <Footer/>} 
    </div>
  );
}

export default App;