import { createContext, useContext } from "react";


const ShoppingCartContext = createContext({})

export function useShoppingCart() {
    const context = useContext(ShoppingCartContext);
    if (!context) {
      throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
    }
    return context;
  }

export function ShoppingCartProvider ({ children }) {
    return (
        <ShoppingCartContext.Provider value={{}}>
            { children }
        </ShoppingCartContext.Provider>
    )
}