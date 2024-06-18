import React, { createContext, useContext, useEffect, useReducer } from 'react';

import { ActionType } from '@/enums';
import { CartItem } from '@/types';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: ActionType.ADD_ITEM; payload: CartItem }
  | { type: ActionType.REMOVE_ITEM; payload: { id: number } }
  | { type: ActionType.UPDATE_QUANTITY; payload: { id: number; quantity: number } };

const loadInitialState = (): CartState => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : { items: [] };
};

const initialState: CartState = loadInitialState();

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  totalPrice: number;
}>({ state: initialState, dispatch: () => null, totalPrice: 0 });

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case ActionType.ADD_ITEM:
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex > -1) {
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item,
        );
        return { ...state, items: updatedItems };
      } else {
        return { ...state, items: [...state.items, action.payload] };
      }
    case ActionType.REMOVE_ITEM:
      return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
    case ActionType.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
        ),
      };
    default:
      return state;
  }
};

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const totalPrice = state.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch, totalPrice }}>{children}</CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
