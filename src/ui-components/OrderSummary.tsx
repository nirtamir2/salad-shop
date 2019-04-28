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
          <div className="OrderSummary__header">
            <div>Item</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Total</div>
          </div>
          <ul className="OrderSummary__list">
            {items.map(o => {
              const { ingredient, count } = o;
              return (
                <li key={ingredient.id}>
                  <div className="OrderSummary__listItem">
                    <div>{ingredient.title}</div>
                    <div>
                      {CURRENCY_SYMBOL}
                      {ingredient.priceInUsd}
                    </div>
                    <div>{count}</div>
                    <div>
                      {CURRENCY_SYMBOL}
                      {(count * ingredient.priceInUsd).toFixed(2)}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="OrderSummary__totalPrice">
            Total price: {CURRENCY_SYMBOL}
            {order.totalPriceInUsd.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
}

export default OrderSummary;
