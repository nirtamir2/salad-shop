import React from "react";
import Ingredient from "./Ingredient";
import { IngredientsContext } from "./IngredientsContext";
import "./IngredientsPage.css";
import Card from "../ui-core/Card";

function IngredientsPage() {
  const ingredientsContext = React.useContext(IngredientsContext);
  const { ingredients, fetchIngredients } = ingredientsContext;

  React.useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  function handleIngredientClick(__ingredient: {
    title: string;
    priceInUsd: number;
  }) {}

  return (
    <div className="IngredientsPage">
      {ingredients.length === 0 ? (
        "No ingredients"
      ) : (
        <ul className="IngredientsPage__list">
          {ingredients.map(i => {
            // Assuming that the title of the ingredient stays unique.
            return (
              <li key={i.title} className="IngredientsPage__list-item">
                <button
                  onClick={() => handleIngredientClick(i)}
                  className="IngredientsPage__list-item-button"
                >
                  <Ingredient title={i.title} priceInUsd={i.priceInUsd} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <Card>
        <h2>Order summary</h2>
        <ul>
          <li>Tomato * 2 = 16$</li>
          <li>Pasta * 2 = 1$</li>
        </ul>
      </Card>
    </div>
  );
}

export default IngredientsPage;
