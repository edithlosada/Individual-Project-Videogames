import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import LandingP from './components/LandingP/LandingP.jsx';
import Home from './components/Home/Home.jsx';
import NewGame from './components/NewGame/NewGame.jsx';
import GameDetail from './components/GameDetail/GameDetail.jsx';

export function App() {
  return (
    <React.Fragment>
      <Route exact path="/" component={LandingP} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/newgame" component={NewGame} />
      <Route exact path='/gamedetail/:id' component={GameDetail} />
    </React.Fragment>  
  );
}

export default App;