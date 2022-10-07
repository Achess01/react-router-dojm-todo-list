import { useState, useEffect } from "react";

function useLocalStorage(itemName, initialValue) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(initialValue);
  useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItems;
        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItems = initialValue;
        } else {
          parsedItems = JSON.parse(localStorageItem);
        }

        setItem(parsedItems);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveItems = (newItems) => {
    try {
      const stringifidiedItems = JSON.stringify(newItems);
      localStorage.setItem(itemName, stringifidiedItems);
      setItem(newItems);
    } catch (error) {
      setError(error);
    }
  };

  return { item, saveItems, loading, error };
}

export { useLocalStorage };
