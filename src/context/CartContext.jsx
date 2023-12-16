import { createContext, useReducer } from 'react';

// Create the context
const CartContext = createContext();


// Initial state for the cart
const initialCartState = {
  cartItems: [],
};


// Define a reducer function to handle state changes
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);

      console.log('Action Payload ID:', action.payload.id);
      console.log('Existing Item:', existingItem);
      console.log('Cart Items:', state.cartItems);

      if (existingItem) {
        // If the item already exists in the cart, update its quantity
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // If the item is not in the cart, add it with a quantity of 1
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === action.payload
              ? { ...item, quantity: Math.max(0, item.quantity - 1) }
              : item
          ).filter(item => item.quantity > 0), // Remove items with quantity 0
        };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

// Create a provider component that wraps your app
export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  // Define functions to update the cart state and pass them down through the context
  const addToCart = (itemId) => {
    dispatch({ type: 'ADD_TO_CART', payload: { id: itemId } });
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId})
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  };

  return (
    <CartContext.Provider
      value={{
        cartState,
        addToCart,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;