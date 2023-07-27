import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      // เช็คว่ามีข้อมูลสินค้านั้นหรือยังหากมีแล้วให้อัพเดท qty เข้าไป 1
      const chk_item = state.find((item) => item.id === action.payload.id);

      if (!chk_item) {
        state.push(action.payload);
      } else {
        return state.map((item) => ({
          ...item,
          qty: item.id === chk_item.id ? item.qty + 1 : item.qty,
        }));
      }
    },

    deleteCart: (state, action) =>
      state.filter((itemDel) => itemDel.id !== action.payload),

    editItemCart: (state, action) => {
      // เช็คว่ามีข้อมูลสินค้านั้นหรือยังหากมีแล้วให้อัพเดท qty เข้าไป 1
      const chk_item_QP = state.find(
        (itemqp) => itemqp.id === action.payload.id
      );

      if (!chk_item_QP) {
        state.push(action.payload);
      } else {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: action.payload.qty, price: action.payload.price }
            : item
        );
      }
    },
  },
});

// Action creators
export const { addToCart, deleteCart, editItemCart } = cartSlice.actions;

// Reducer
export default cartSlice.reducer;
