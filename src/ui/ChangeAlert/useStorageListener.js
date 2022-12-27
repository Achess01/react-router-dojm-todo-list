import React from "react";

function useStorageListener(synchronize) {
  const [storageChange, setStorageChange] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener("storage", (change) => {
      if (change.key === "TODOS_V1") {
        setStorageChange(true);
      }
    });
  }, [storageChange]);
  const toggleShow = () => {
    synchronize();
    setStorageChange(false);
  };

  return { show: storageChange, toggleShow };
}

export { useStorageListener };

//HOC
/* import React from "react";

function withStorageListener(WrappedComponent) {
  return function WrappedComponentWithStorageListener(props) {
    const [storageChange, setStorageChange] = React.useState(false);
    React.useEffect(() => {
      window.addEventListener("storage", (change) => {
        if (change.key === "TODOS_V1") {
          setStorageChange(true);
        }
      });
    }, [storageChange]);
    const toggleShow = () => {
      props.synchronizeTodos();
      setStorageChange(false);
    };

    return <WrappedComponent show={storageChange} toggleShow={toggleShow} />;
  };
}

export { withStorageListener }; */
