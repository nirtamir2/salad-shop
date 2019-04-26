import React from "react";
import Button from "../ui-core/Button";
import Card from "../ui-core/Card";
import IngredientListItem from "./IngredientListItem";
import { IngredientsContext } from "./IngredientsContext";
import "./IngredientsPage.css";

function IngredientsPage() {
  const ingredientsContext = React.useContext(IngredientsContext);
  const {
    ingredients,
    fetchIngredients,
    addOrderItem,
    deleteOrderItem
  } = ingredientsContext;

  React.useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  return (
    <div className="IngredientsPage">
      {ingredients.length === 0 ? (
        "No ingredients"
      ) : (
        <ul className="IngredientsPage__list">
          {ingredients.map(i => {
            return (
              <IngredientListItem
                key={i.id}
                priceInUsd={i.priceInUsd}
                title={i.title}
                onAdd={() => addOrderItem(i.id)}
                onDelete={() => deleteOrderItem(i.id)}
              />
            );
          })}
        </ul>
      )}
      <div className="IngredientsPage__overview">
        <Card>
          <div className="IngredientsPage__overview__card">
            <h2>Order summary</h2>
            {ingredients.length === 0 ? null : (
              <ul>
                {ingredients
                  .filter(i => i.count > 0)
                  .map(o => {
                    return (
                      <li key={o.id}>
                        <div>
                          {o.title} x {o.count} ={" "}
                          {(o.count * o.priceInUsd).toFixed(2)}$
                        </div>
                      </li>
                    );
                  })}
              </ul>
            )}
          </div>
        </Card>
      </div>
      <div className="IngredientsPage__button">
        <Button to="/checkout">Proceed to Checkout</Button>
      </div>
    </div>
  );
}

export default IngredientsPage;
