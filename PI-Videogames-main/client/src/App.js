import { Route, BrowserRouter, Switch } from "react-router-dom"
import Create from './views/create/create.component';
import Detail from './views/detail/detail.component';
import  Home from "./views/home/home.component"



function App() {
  return (
      <div>
        <Switch>
          {/* El exact me srive para no pisar el componente /home */}
          <Route exact path="/home" component= {Home}/>
          <Route path="/home/:id" component= {Detail}/>
          <Route path="/home" component= {Create}/>
        </Switch>
      </div>
  );
}

export default App;
