import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import IngredientsPage from "./IngredientsPage";
import CheckoutPage from "./CheckoutPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="App__body">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/ingredients/" component={IngredientsPage} />
          <Route path="/checkout/" component={CheckoutPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
