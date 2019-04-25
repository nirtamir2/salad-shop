import React from "react";
import "./Ingredient.css";

interface IProps {
  title: string;
  priceInUsd: number;
}

const CURRENCY_SYMBOL = "$";
function Ingredient(props: IProps) {
  const { title, priceInUsd } = props;
  return (
    <div className="Ingredient">
      <div className="Ingredient__title">{title}</div>
      <div className="Ingredient__price">
        {priceInUsd}
        {CURRENCY_SYMBOL}
      </div>
    </div>
  );
}

export default Ingredient;
