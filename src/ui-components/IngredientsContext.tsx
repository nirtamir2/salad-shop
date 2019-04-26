import React from "react";

export interface IIngredient {
  title: string;
  priceInUsd: number;
}

export interface IIngredientContextValue {
  ingredients: ReadonlyArray<IIngredient>;
  order: ReadonlyMap<string, number>;
  clearIngredients: () => void;
  fetchIngredients: () => void;
  clearOrder: () => void;
  addUserOrderItem: (id: string) => void;
  deleteOrderItem: (id: string) => void;
}

export const IngredientsContext = React.createContext<IIngredientContextValue>({
  ingredients: [],
  order: new Map(),
  clearIngredients: function noop() {},
  fetchIngredients: function noop() {},
  addUserOrderItem: function noop() {},
  deleteOrderItem: function noop() {},
  clearOrder: function noop() {}
});
