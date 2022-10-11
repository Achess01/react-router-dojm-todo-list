import { useState, useEffect } from "react";

function useLocalStorage(itemName, initialValue) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(initialValue);
  const [synchronizedItem, setSynchronizedItem] = useState(true);

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
        setSynchronizedItem(true);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [synchronizedItem]);

  const saveItems = (newItems) => {
    try {
      const stringifidiedItems = JSON.stringify(newItems);
      localStorage.setItem(itemName, stringifidiedItems);
      setItem(newItems);
    } catch (error) {
      setError(error);
    }
  };

  const synchronizeItem = () => {
    setLoading(true);
    setSynchronizedItem(false);
  };

  return { item, saveItems, loading, error, synchronizeItem };
}

export { useLocalStorage };
