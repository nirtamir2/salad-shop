import React from "react";
import { IngredientsContext } from "./IngredientsContext";
import Card from "../ui-core/Card";
import IngredientListItem from "./IngredientListItem";
import "./IngredientsPage.css";

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

  function handleIngredientClick(ingredient: {
    title: string;
    priceInUsd: number;
  }) {
    addUserOrderItem(ingredient.title);
  }

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
                onClick={() => handleIngredientClick(i)}
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
                        <button
                          onClick={() => {
                            addUserOrderItem(o.title);
                          }}
                        >
                          +
                        </button>
                        <button
                          onClick={() => {
                            deleteOrderItem(o.title);
                          }}
                        >
                          -
                        </button>
                        <div>
                          {o.title} x {o.count} ={" "}
                          {(o.count * o.priceInUsd).toFixed(2)}$
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default IngredientsPage;
