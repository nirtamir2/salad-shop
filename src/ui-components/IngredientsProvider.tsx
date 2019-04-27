import React from "react";
import useIsMounted from "./hooks/useIsMounted";
import { IIngredient, IngredientsContext } from "./IngredientsContext";
import { SALAD_INGREDIENTS_URL } from "../constants/constants";

interface IProps {
  children: React.ReactNode;
}

type StateOrderT = ReadonlyMap<
  string /*ingredientId*/,
  { id: string; count: number }
>;

type StateIngredientsT = ReadonlyMap<string, IIngredient>;

interface IState {
  ingredients: StateIngredientsT;
  order: StateOrderT;
}

type ActionT =
  | ISetIngredientsAction
  | IClearIngredientsAction
  | IAddOrderItemAction
  | IDeleteOrderItemAction
  | IClearOrderAction;

interface ISetIngredientsAction {
  type: "SET_INGREDIENTS";
  payload: { ingredients: ReadonlyArray<IIngredient> };
}
interface IClearIngredientsAction {
  type: "CLEAR_INGREDIENTS";
}
interface IAddOrderItemAction {
  type: "ADD_ORDER_ITEM";
  payload: {
    id: string;
  };
}
interface IDeleteOrderItemAction {
  type: "DELETE_ORDER_ITEM";
  payload: {
    id: string;
  };
}
interface IClearOrderAction {
  type: "CLEAR_ORDER";
}

function reduceAddOrderItem(state: IState, action: IAddOrderItemAction) {
  const id = action.payload.id;
  if (!state.ingredients.has(id)) return state;
  const order = new Map(state.order);
  const orderItem = order.get(id);
  if (orderItem == null) {
    order.set(id, { id, count: 1 });
    return { ...state, order };
  }
  order.set(id, { ...orderItem, count: orderItem.count + 1 });
  return {
    ...state,
    order
  };
}

function reduceSetIngredients(state: IState, action: ISetIngredientsAction) {
  const ingredients = new Map(state.ingredients);
  action.payload.ingredients.forEach(i => ingredients.set(i.id, i));
  return { ...state, ingredients };
}

function reduceDeleteOrderItem(action: IDeleteOrderItemAction, state: IState) {
  const id = action.payload.id;

  const order = new Map(state.order);
  const orderItem = order.get(id);
  if (orderItem == null) {
    return state;
  }
  if (orderItem.count === 1) {
    order.delete(id);
    return { ...state, order };
  }
  order.set(id, { ...orderItem, count: orderItem.count - 1 });
  return {
    ...state,
    order
  };
}

function reducer(state: IState, action: ActionT): IState {
  switch (action.type) {
    case "SET_INGREDIENTS":
      return reduceSetIngredients(state, action);
    case "CLEAR_INGREDIENTS":
      if (state.ingredients.size === 0) return state;
      return {
        order: new Map(),
        ingredients: new Map()
      };
    case "ADD_ORDER_ITEM":
      return reduceAddOrderItem(state, action);
    case "DELETE_ORDER_ITEM":
      return reduceDeleteOrderItem(action, state);
    case "CLEAR_ORDER":
      if (state.order.size === 0) return state;
      return {
        ...state,
        order: new Map()
      };
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      `IngredientsProvider#reducer() - unsupported action ${action}`
    );
  }
}

const INITIAL_STATE: IState = { ingredients: new Map(), order: new Map() };

function IngredientsProvider(props: IProps) {
  const { children } = props;
  const [state, dispatch] = React.useReducer<React.Reducer<IState, ActionT>>(
    reducer,
    INITIAL_STATE
  );

  const isMounted = useIsMounted();

  const fetchIngredients = React.useCallback(() => {
    (async function() {
      try {
        const res = await fetch(SALAD_INGREDIENTS_URL);
        if (!isMounted) return;
        if (!res.ok) {
          if (process.env.NODE_ENV !== "production") {
            console.error(
              `IngredientsProvider#fetchIngredients() - Response with status ${
                res.status
              }`,
              res
            );
          }
          return;
        }
        try {
          const ingredientsData = await res.json();
          if (!isMounted) return;

          const ingredients = (ingredientsData.items as ReadonlyArray<{
            name: string;
            price: number;
          }>).map((ingredient, index) => {
            return {
              id: index.toString(),
              title: ingredient.name,
              priceInUsd: ingredient.price,
              count: 0
            };
          });

          dispatch({ type: "SET_INGREDIENTS", payload: { ingredients } });
        } catch (e) {
          if (process.env.NODE_ENV !== "production") {
            console.error(
              "IngredientsProvider#fetchIngredients() - Parsing error",
              e
            );
          }
          return;
        }
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          console.error(
            "IngredientsProvider#fetchIngredients() - Network error",
            e
          );
        }
        return;
      }
    })();
  }, [isMounted]);

  const clearIngredients = React.useCallback(() => {
    dispatch({ type: "CLEAR_INGREDIENTS" });
  }, []);
  const addOrderItem = React.useCallback((id: string) => {
    dispatch({ type: "ADD_ORDER_ITEM", payload: { id } });
  }, []);
  const deleteOrderItem = React.useCallback((id: string) => {
    dispatch({ type: "DELETE_ORDER_ITEM", payload: { id } });
  }, []);
  const clearOrder = React.useCallback(() => {
    dispatch({ type: "CLEAR_ORDER" });
  }, []);

  const contextValue = React.useMemo(() => {
    const orderItems = [];
    for (const [id, order] of state.order) {
      const ingredient = state.ingredients.get(id);
      if (ingredient == null) continue;
      orderItems.push({ ingredient, count: order.count });
    }

    const order = {
      items: orderItems,
      totalPriceInUsd: orderItems.reduce((accumulator, currentValue) => {
        return (
          accumulator + currentValue.ingredient.priceInUsd * currentValue.count
        );
      }, 0)
    };

    const ingredients = [...state.ingredients.values()];
    return {
      ingredients,
      order,
      fetchIngredients,
      clearIngredients,
      addOrderItem,
      deleteOrderItem,
      clearOrder
    };
  }, [
    state,
    fetchIngredients,
    clearIngredients,
    addOrderItem,
    deleteOrderItem,
    clearOrder
  ]);

  return (
    <IngredientsContext.Provider value={contextValue}>
      {children}
    </IngredientsContext.Provider>
  );
}

export default IngredientsProvider;
