import { createContext, useState, useContext } from 'react';

const DateRangeContext = createContext();

export const useDateRange = () => {
  const context = useContext(DateRangeContext);
  if (!context) {
    throw new Error('useDateRange must be used within a DateRangeProvider');
  }
  return context;
};

export const DateRangeProvider = ({ children }) => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const setNewDateRange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  return (
    <DateRangeContext.Provider value={{ dateRange, setNewDateRange }}>
      {children}
    </DateRangeContext.Provider>
  );
};