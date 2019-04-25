import React from "react";

export interface IIngredient {
  title: string;
  priceInUsd: number;
}

export interface IIngredientContextValue {
  ingredients: ReadonlyArray<IIngredient>;
  clearIngredients: () => void;
  fetchIngredients: () => void;
}

export const IngredientsContext = React.createContext<IIngredientContextValue>({
  ingredients: [],
  clearIngredients: function noop() {},
  fetchIngredients: function noop() {}
});
