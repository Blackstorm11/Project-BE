import React, { createContext, useState } from 'react';

export const FinalSubjectContext = createContext();

export const FinalSubjectProvider = ({ children }) => {
  const [scheduledSubject, setSubject] = useState([]);

  return (
    <FinalSubjectContext.Provider value={{ scheduledSubject, setSubject }}>
      {children}
    </FinalSubjectContext.Provider>
  );
};
