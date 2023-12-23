import { createContext, useState, useContext } from 'react';

// create new context for managing cart dates
const DateRangeContext = createContext();

// hook for accessing context
export const useDateRange = () => {
  // Get the current value of the DateRangeContext using useContext hook
  const context = useContext(DateRangeContext);
  if (!context) {
    throw new Error('useDateRange must be used within a DateRangeProvider');
  }
  return context;
};

// DateRangeProvider component for managing the date range state
export const DateRangeProvider = ({ children }) => {
  // State to manage the start and end dates of the date range
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  // Function to update the date range with a new value
  const setNewDateRange = (newDateRange) => {
    // Update the state with the new date range
    setDateRange(newDateRange);
  };

  // Provide the DateRangeContext with the current date range and update function
  return (
    <DateRangeContext.Provider value={{ dateRange, setNewDateRange }}>
      {children}
    </DateRangeContext.Provider>
  );
};