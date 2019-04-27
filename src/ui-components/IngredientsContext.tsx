import React from "react";

export interface IIngredient {
  id: string;
  title: string;
  priceInUsd: number;
}

export interface IIngredientContextValueOrder {
  totalPriceInUsd: number;
  items: ReadonlyArray<{ ingredient: IIngredient; count: number }>;
}

export type IngredientContextValueIngredientsT = ReadonlyArray<IIngredient>;

export interface IIngredientContextValue {
  ingredients: IngredientContextValueIngredientsT;
  order: IIngredientContextValueOrder;
  fetchIngredients: () => void;
  clearIngredients: () => void;
  addOrderItem: (id: string) => void;
  deleteOrderItem: (id: string) => void;
  clearOrder: () => void;
}

export const IngredientsContext = React.createContext<IIngredientContextValue>({
  ingredients: [],
  order: { items: [], totalPriceInUsd: 0 },
  fetchIngredients: function noop() {},
  clearIngredients: function noop() {},
  addOrderItem: function noop() {},
  deleteOrderItem: function noop() {},
  clearOrder: function noop() {}
});
