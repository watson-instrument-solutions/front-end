import { createContext, useReducer } from 'react';

// Initial state for the cart
const initialCartState = {
  items: [],
};

// Create the context
const CartContext = createContext();

// Define a reducer function to handle state changes
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    // Add more cases for other actions (update quantity, clear cart, etc.)
    default:
      return state;
  }
};

// Create a provider component that wraps your app
export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  // Define functions to update the cart state and pass them down through the context
  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId})
  };

  // Add more functions as needed

  return (
    <CartContext.Provider
      value={{
        cartState,
        addToCart,
        removeFromCart,
        // Add other functions to the context value
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;