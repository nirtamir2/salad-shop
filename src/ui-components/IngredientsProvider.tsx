import React from "react";
import useIsMounted from "./hooks/useIsMounted";
import { IIngredient, IngredientsContext } from "./IngredientsContext";
import { SALAD_INGREDIENTS_URL } from "../constants/constants";

interface IProps {
  children: React.ReactNode;
}

interface IState {
  ingredients: ReadonlyArray<IIngredient>;
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

function reducer(state: IState, action: ActionT): IState {
  switch (action.type) {
    case "SET_INGREDIENTS":
      return { ingredients: action.payload.ingredients };
    case "CLEAR_INGREDIENTS":
      if (state.ingredients.length === 0) return state;
      return {
        ingredients: []
      };
    case "ADD_ORDER_ITEM":
      return {
        ingredients: state.ingredients.map(i => {
          return i.id === action.payload.id ? { ...i, count: i.count + 1 } : i;
        })
      };
    case "DELETE_ORDER_ITEM":
      if (
        state.ingredients.some(i => i.id === action.payload.id && i.count === 0)
      )
        return state;
      return {
        ingredients: state.ingredients.map(i => {
          return i.id === action.payload.id ? { ...i, count: i.count - 1 } : i;
        })
      };
    case "CLEAR_ORDER":
      if (state.ingredients.some(i => i.count !== 0)) return state;
      return {
        ingredients: state.ingredients.map(i => {
          return { ...i, count: 0 };
        })
      };
  }
}

const INITIAL_STATE: IState = { ingredients: [] };

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
    return {
      ingredients: state.ingredients,
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
