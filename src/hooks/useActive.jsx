import { useState } from "react";

const useActive = () => {
  const [active, setActive] = useState(false);
  const handleActive = (value) => {
    if (typeof value === "boolean") {
      setActive(value);
    } else {
      setActive(!active);
    }
  };

  return [active, handleActive];
};

export default useActive;
