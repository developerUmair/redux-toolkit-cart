import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const url = `https://www.course-api.com/react-useReducer-cart-project`;

const initialState = {
  cartItems: [],
  amount: 1,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
  return fetch(url)
    .then((res) => res.json())
    .catch((error) => alert(error));
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },
    removeItem: (state, action) => {
      console.log(action);
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    // increase: (state, action) => {
    //   const itemId = action.payload;
    //   const cartItem = state.cartItems.find((item) => item.id === itemId);
    //   //   cartItem.amount = cartItem.amount + 1;
    //   cartItem.amount += 1;
    // },

    // decrease: (state, action) => {
    //   const itemId = action.payload;
    //   const cartItem = state.cartItems.find((item) => item.id === itemId);
    //   if (cartItem.amount > 1) {
    //     cartItem.amount -= 1;
    //   } else {
    //     state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    //   }
    // },

    toggleAmount: (state, action) => {
      console.log(action);
      const { type, id } = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === id);
      if (cartItem) {
        if (type === "increase") {
          cartItem.amount += 1;
        } else if (type === "decrease") {
          if (cartItem.amount > 1) {
            cartItem.amount -= 1;
          } else {
            state.cartItems = state.cartItems.filter((item) => item.id !== id);
          }
        }
      }
    },

    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });

      state.amount = amount;
      state.total = total;
    },
  },

  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log("action", action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },

    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

// console.log(cartSlice)
export const {
  clearCart,
  removeItem,
  increase,
  decrease,
  toggleAmount,
  calculateTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
