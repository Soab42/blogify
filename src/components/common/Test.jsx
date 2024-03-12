import React from "react";
import { useNotification } from "../../context/notification";

const ExampleComponent = () => {
  const { addNotification } = useNotification();

  const handleClick = () => {
    addNotification("This is a notification!");
  };

  return (
    <div>
      <button onClick={handleClick}>Show Notification</button>
    </div>
  );
};

export default ExampleComponent;
