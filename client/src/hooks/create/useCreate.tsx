import { useState } from "react";

export default function useCreate() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const goToNextStep = () => {
    setSelectedIndex((prevIndex) => {
      return prevIndex < 3 ? prevIndex + 1 : prevIndex;
    });
  };

  return {
    selectedIndex,
    setSelectedIndex,
    goToNextStep,
  };
}
