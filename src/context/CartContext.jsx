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
  const newItem = { ...action.payload, quantity: 1 };

  // Check if the item is already in the cart
  if (existingItem) {
    // Check if adding one more would exceed the available stock
    if (existingItem.quantity + 1 <= action.payload.stock) {
      // If not, update the quantity
      const newState = {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

      // Save the updated state to local storage
      localStorage.setItem('cart', JSON.stringify(newState));

      return newState;
    } else {
      alert('Maximum available stock reached!');
      return state;
    }
  } else {
    // Check if adding the new item would exceed the available stock
    if (newItem.quantity <= action.payload.stock) {
      // If not, add the item with a quantity of 1
      const newState = {
        ...state,
        cartItems: [...state.cartItems, newItem],
      };

      // Save the updated state to local storage
      localStorage.setItem('cart', JSON.stringify(newState));

      return newState;
    } else {
      // If adding the new item would exceed the available stock, do nothing or handle as needed
      return state;
    }
  }

  case 'REMOVE_FROM_CART':
    const newState = {
      ...state,
      cartItems: state.cartItems
        .map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
        .filter(item => item.quantity > 0), // Remove items with quantity 0
    };

    // Save the updated state to local storage
    localStorage.setItem('cart', JSON.stringify(newState));
    return newState;

    // case 'CLEAR_CART':
    //   // clear local storge
    //   localStorage.removeItem('cart');
    //     return {
    //       ...state,
    //       items: [],
    //     };

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

  const removeFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  // const clearCart = () => {
  //   dispatch({ type: 'CLEAR_CART' })
  // };

  // In your CartProvider component or wherever you initialize your state
const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : initialCartState;
};



  return (
    <CartContext.Provider
      value={{
        cartState,
        addToCart,
        removeFromCart,
        // clearCart,
        loadCartFromLocalStorage
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;