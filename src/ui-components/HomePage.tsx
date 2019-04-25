import React from "react";
import Button from "../ui-core/Button";
import Card from "../ui-core/Card";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="HomePage">
      <Card>
        <h2 className="HomePage-title">Welcome to the salad shop</h2>
        <p className="HomePage-subtitle">
          This is the right place to buy a salad!
        </p>
        <span role="img" aria-label="salad" className="HomePage__image">
          🥗
        </span>
        <Button to="ingredients">Order Salad</Button>
      </Card>
    </div>
  );
}

export default HomePage;
