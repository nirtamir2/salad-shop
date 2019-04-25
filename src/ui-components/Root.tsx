import React from "react";
import { BrowserRouter } from "react-router-dom";
import IngredientsProvider from "./IngredientsProvider";
import App from "./App";

function Root() {
  return (
    <BrowserRouter>
      <IngredientsProvider>
        <App />
      </IngredientsProvider>
    </BrowserRouter>
  );
}

export default Root;
