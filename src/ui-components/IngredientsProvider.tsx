import React from "react";
import useIsMounted from "./hooks/useIsMounted";
import { IIngredient, IngredientsContext } from "./IngredientsContext";

interface IProps {
  children: React.ReactNode;
}

function IngredientsProvider(props: IProps) {
  const { children } = props;

  const isMounted = useIsMounted();

  const [ingredients, setIngredients] = React.useState<
    ReadonlyArray<IIngredient>
  >([]);

  const [order, setOrder] = React.useState<ReadonlyMap<string, number>>(
    new Map<string, number>()
  );

  const clearIngredients = React.useCallback(() => {
    setIngredients([]);
  }, []);

  const fetchIngredients = React.useCallback(() => {
    (async function() {
      try {
        const res = await fetch("salad.json");
        if (!isMounted) return;
        if (!res.ok) {
          if (process.env.NODE_ENV !== "production") {
            console.error(
              "IngredientsProvider#fetchIngredients() - Response error",
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
          }>).map(i => {
            return { title: i.name, priceInUsd: i.price };
          });
          setIngredients(ingredients);
        } catch (e) {
          if (process.env.NODE_ENV !== "production") {
            console.error(
              "IngredientsProvider#fetchIngredients() - Parse error",
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

  const addUserOrderItem = React.useCallback((id: string) => {
    setOrder(o => {
      const count = o.get(id) || 0;
      const order = new Map(o);
      order.set(id, count + 1);
      return order;
    });
  }, []);

  const deleteOrderItem = React.useCallback((id: string) => {
    setOrder(o => {
      const count = o.get(id) || 0;
      if (count === 0) {
        return o;
      }

      const order = new Map(o);
      order.set(id, count - 1);
      return order;
    });
  }, []);

  const clearOrder = React.useCallback(() => {
    setOrder(o => {
      if (o.size === 0) {
        return o;
      }
      return new Map();
    });
  }, []);

  const contextValue = React.useMemo(() => {
    return {
      ingredients,
      order,
      fetchIngredients,
      clearIngredients,
      addUserOrderItem,
      deleteOrderItem,
      clearOrder
    };
  }, [
    ingredients,
    order,
    fetchIngredients,
    clearIngredients,
    addUserOrderItem,
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
