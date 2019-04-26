import React from "react";

export interface IIngredient {
  id: string;
  title: string;
  priceInUsd: number;
  count: number;
}

export interface IIngredientContextValue {
  ingredients: ReadonlyArray<IIngredient>;
  fetchIngredients: () => void;
  clearIngredients: () => void;
  addOrderItem: (id: string) => void;
  deleteOrderItem: (id: string) => void;
  clearOrder: () => void;
}

export const IngredientsContext = React.createContext<IIngredientContextValue>({
  ingredients: [],
  fetchIngredients: function noop() {},
  clearIngredients: function noop() {},
  addOrderItem: function noop() {},
  deleteOrderItem: function noop() {},
  clearOrder: function noop() {}
});
