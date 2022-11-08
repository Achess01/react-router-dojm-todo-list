import { useEffect, useReducer } from "react";

function useLocalStorage(itemName, initialValue) {
  const [state, dispatch] = useReducer(reducer, initialState({ initialValue }));
  const { error, loading, item, synchronizedItem } = state;

  // ACTION CREATORS
  const onError = (error) => {
    dispatch({ type: actionTypes.error, payload: error });
  };

  const onSuccess = (item) => {
    dispatch({ type: actionTypes.success, payload: item });
  };

  const onSave = (item) => {
    dispatch({ type: actionTypes.save, payload: item });
  };

  const onSynchronize = () => {
    dispatch({ type: actionTypes.synchronize });
  };

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

        onSuccess(parsedItems);
      } catch (error) {
        onError(error);
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [synchronizedItem]);

  const saveItems = (newItems) => {
    try {
      const stringifidiedItems = JSON.stringify(newItems);
      localStorage.setItem(itemName, stringifidiedItems);
      onSave(newItems);
    } catch (error) {
      onError(error);
    }
  };

  return { item, saveItems, loading, error, synchronizeItem: onSynchronize };
}

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state;
};

const actionTypes = {
  error: "ERROR",
  success: "SUCCESS",
  save: "SAVE",
  synchronize: "SYNCHRONIZE",
};

const reducerObject = (state, payload) => ({
  [actionTypes.error]: {
    ...state,
    error: true,
  },
  [actionTypes.success]: {
    ...state,
    error: false,
    loading: false,
    synchronizedItem: true,
    item: payload,
  },
  [actionTypes.save]: {
    ...state,
    item: payload,
  },
  [actionTypes.synchronize]: {
    ...state,
    loading: true,
    synchronizedItem: false,
  },
});

const initialState = ({ initialValue }) => ({
  error: false,
  loading: true,
  item: initialValue,
  synchronizedItem: true,
});

export { useLocalStorage };
