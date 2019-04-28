import React from "react";
import Button from "../ui-core/Button";
import Card from "../ui-core/Card";
import IngredientListItem from "./IngredientListItem";
import OrderSummaryDetails from "./OrderSummary";
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
          <div className="IngredientsPage__overview__content">
            <h2>Order summary</h2>
            <OrderSummaryDetails order={order} />
          </div>
        </Card>
      </div>
      <div className="IngredientsPage__button">
        <Button to="/checkout" disabled={order.items.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}

export default IngredientsPage;
