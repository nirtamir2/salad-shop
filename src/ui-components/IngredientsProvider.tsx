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

  const contextValue = React.useMemo(() => {
    return {
      ingredients,
      fetchIngredients,
      clearIngredients
    };
  }, [ingredients, fetchIngredients, clearIngredients]);

  return (
    <IngredientsContext.Provider value={contextValue}>
      {children}
    </IngredientsContext.Provider>
  );
}

export default IngredientsProvider;
