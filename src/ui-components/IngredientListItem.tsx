import React from "react";
import "./IngredientListItem.css";

interface IProps {
  title: string;
  priceInUsd: number;
  onAdd: () => void;
  onDelete: () => void;
}

const CURRENCY_SYMBOL = "$";
function IngredientListItem(props: IProps) {
  const { title, priceInUsd, onAdd, onDelete } = props;
  return (
    <li key={title} className="IngredientListItem">
      <div className="IngredientListItem__title">{title}</div>
      <div className="IngredientListItem__price">
        {priceInUsd}
        {CURRENCY_SYMBOL}
      </div>
      <button onClick={onAdd} className="IngredientListItem__button">
        +
      </button>
      <button onClick={onDelete} className="IngredientListItem__button">
        -
      </button>
    </li>
  );
}
export default IngredientListItem;
