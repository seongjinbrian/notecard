import React from "react";

export const capitalizeFirstLetter = (letter: string) => {
  return letter.charAt(0).toUpperCase() + letter.slice(1);
};
