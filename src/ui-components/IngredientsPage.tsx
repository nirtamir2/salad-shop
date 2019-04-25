import React from "react";
import { IngredientsContext } from "./IngredientsContext";
import Card from "../ui-core/Card";
import IngredientListItem from "./IngredientListItem";
import "./IngredientsPage.css";
import Button from "../ui-core/Button";

function IngredientsPage() {
  const ingredientsContext = React.useContext(IngredientsContext);
  const {
    ingredients,
    fetchIngredients,
    order,
    addUserOrderItem,
    deleteOrderItem
  } = ingredientsContext;

  React.useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  const formattedOrder = React.useMemo(() => {
    const arr = [];
    for (const [id, count] of order) {
      const ingredient = ingredients.find(i => i.title === id);
      if (ingredient == null) continue;
      arr.push({ ...ingredient, count });
    }
    return arr;
  }, [ingredients, order]);

  return (
    <div className="IngredientsPage">
      {ingredients.length === 0 ? (
        "No ingredients"
      ) : (
        <ul className="IngredientsPage__list">
          {ingredients.map(i => {
            // Assuming that the title of the ingredient stays unique.
            return (
              <IngredientListItem
                key={i.title}
                priceInUsd={i.priceInUsd}
                title={i.title}
                onAdd={() => addUserOrderItem(i.title)}
                onDelete={() => deleteOrderItem(i.title)}
              />
            );
          })}
        </ul>
      )}
      <div className="IngredientsPage__overview">
        <Card>
          <div className="IngredientsPage__overview__card">
            <h2>Order summary</h2>
            {formattedOrder.length === 0 ? null : (
              <ul>
                {formattedOrder.map(o => {
                  return (
                    <li key={o.title}>
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
