import React, { useState } from 'react';

const DropDownContext = React.createContext({
  regions: [],
  transactionStatus: [],
  getDropdowns: () => {},
});

export const DropDownContextProvider = props => {
  const [regions, setRegions] = useState([]);
  const [transactionStatus, setTransactionStatus] = useState([]);

  const contextValue = {
    regions: regions,
    transactionStatus: transactionStatus,
  };

  return (
    <DropDownContext.Provider value={contextValue}>
      {props.children}
    </DropDownContext.Provider>
  );
};

export default DropDownContext;
