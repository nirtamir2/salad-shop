import React from "react";
import Button from "../ui-core/Button";
import "./HomePage.css";

function HomePage() {
  return (
    <article className="HomePage">
      <h2 className="HomePage-title">Welcome to the salad shop</h2>
      <p className="HomePage-subtitle">This is the right place to buy salad!</p>
      <span role="img" aria-label="salad" className="HomePage__image">
        🥗
      </span>
      <Button to="ingredients">Start now</Button>
    </article>
  );
}

export default HomePage;
