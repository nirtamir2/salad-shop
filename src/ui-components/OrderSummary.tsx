import React from "react";
import { IIngredientContextValueOrder } from "./IngredientsContext";
import { CURRENCY_SYMBOL } from "../constants/constants";
import "./OrderSummary.css";

interface IProps {
  order: IIngredientContextValueOrder;
}

function OrderSummary(props: IProps) {
  const { order } = props;
  const { items } = order;
  return (
    <div className="OrderSummary">
      {items.length === 0 ? null : (
        <>
          <ul>
            {items.map(o => {
              const { ingredient, count } = o;
              return (
                <li key={ingredient.id}>
                  <div>
                    {ingredient.title} x {count} = {CURRENCY_SYMBOL}
                    {(count * ingredient.priceInUsd).toFixed(2)}
                  </div>
                </li>
              );
            })}
          </ul>
          <div>
            Total price: {CURRENCY_SYMBOL}
            {order.totalPriceInUsd.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
}

export default OrderSummary;
