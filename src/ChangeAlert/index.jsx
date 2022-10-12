import React from "react";
import { useStorageListener } from "./useStorageListener";
import "./ChangeAlert.css";

function ChangeAlert({ synchronize }) {
  const { show, toggleShow } = useStorageListener(synchronize);
  if (show) {
    return (
      <div className="ChangeAlert-bg">
        <div className="ChangeAlert-container">
          <p>Your list is outdated</p>
          <button
            className="TodoForm-button TodoForm-button--add"
            onClick={() => {
              toggleShow();
            }}
          >
            Refresh
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export { ChangeAlert };
