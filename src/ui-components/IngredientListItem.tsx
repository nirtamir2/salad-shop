import React from "react";
import "./IngredientListItem.css";

interface IProps {
  title: string;
  priceInUsd: number;
  onClick: () => void;
}

const CURRENCY_SYMBOL = "$";
function IngredientListItem(props: IProps) {
  const { title, priceInUsd, onClick } = props;
  return (
    <li key={title} className="IngredientListItem">
      <button onClick={onClick} className="IngredientListItem__button">
        <div className="IngredientListItem__title">{title}</div>
        <div className="IngredientListItem__price">
          {priceInUsd}
          {CURRENCY_SYMBOL}
        </div>
      </button>
    </li>
  );
}
export default React.memo(IngredientListItem);
