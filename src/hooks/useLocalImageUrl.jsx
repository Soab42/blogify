import { useState } from "react";

export const useLocalImageURL = (files) => {
  const [imagePath, setImagePath] = useState();

  if (files?.length > 0) {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImagePath(reader.result);
    };
    reader.onerror = () => {
      // Handle error if file reading fails
      console.error("Error reading the file.");
    };
    reader.readAsDataURL(file);
  }

  return imagePath;
};
