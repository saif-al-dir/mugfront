import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // { product, quantity, description? }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { product, quantity } = action.payload;
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );
      if (existingIndex >= 0) {
        // Update quantity
        state.items[existingIndex].quantity += quantity;
      } else {
        state.items.push({ product, quantity, description: '' });
      }
    },
    updateQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.product.id === productId);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.product.id !== productId);
    },
    updateDescription(state, action) {
      const { productId, description } = action.payload;
      const item = state.items.find((item) => item.product.id === productId);
      if (item) {
        item.description = description;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  updateDescription,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;