import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login'
import Registro from './components/Registro'
import Principal from './components/Principal'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route path="/registro">
            <Registro />
          </Route>
          <Route path="/principal">
            <Principal />
          </Route>
        </Switch>
      </div>
    </Router>

    
  );
}



export default App;
