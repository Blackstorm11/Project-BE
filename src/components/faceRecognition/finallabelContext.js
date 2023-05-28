// FinalLabelsContext.js
import React, { createContext, useState } from 'react';

export const FinalLabelsContext = createContext();

export const FinalLabelsProvider = ({ children }) => {
  const [finalLabels, setFinalLabels] = useState([]);

  return (
    <FinalLabelsContext.Provider value={{ finalLabels, setFinalLabels }}>
      {children}
    </FinalLabelsContext.Provider>
  );
};
