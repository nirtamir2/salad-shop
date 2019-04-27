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
    order,
    fetchIngredients,
    addOrderItem,
    deleteOrderItem
  } = ingredientsContext;

  React.useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  const orderItems = order.items;

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
            {orderItems.length === 0 ? null : (
              <ul>
                {orderItems.map(o => {
                  const { ingredient, count } = o;
                  return (
                    <li key={ingredient.id}>
                      <div>
                        {ingredient.title} x {count} ={" "}
                        {(count * ingredient.priceInUsd).toFixed(2)}$
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
        <Button to="/checkout" disabled={orderItems.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}

export default IngredientsPage;
