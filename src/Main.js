import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import App from "./App";

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Pokemon Search</h1>
          <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/Pokedex">Pokedex</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/Pokedex" component={App}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}
export default Main;
