import { createSlice } from "@reduxjs/toolkit";
import { initState } from "../initState";

const basketSlice = createSlice({
  name: "basket",
  initialState: initState.basket,
  reducers: {
    basketAdd(state, actions) {
      const product = {
        id: actions.payload,
        count: 1,
        isChecked: false,
      };
      state.push(product);
    },
    basketRemove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    basketIncrement(state, actions) {
      state.map((item) => {
        if (item.id === actions.payload) {
          return (item.count += 1);
        }
        return item;
      });
    },
    basketDecrement(state, actions) {
      state.map((item) => {
        if (item.id === actions.payload) {
          return (item.count -= 1);
        }
        return item;
      });
    },
    basketIsChecked(state, actions) {
      state.map((item) => {
        if (item.id === actions.payload) {
          return (item.isChecked = !item.isChecked);
        }
        return item;
      });
    },
    basketIsCheckedAll(state, actions) {
      state.map((item) => (item.isChecked = actions.payload));
    },
    basketDeleteSelected(state){
      return state.filter((item) => item.isChecked !== true);
    }
  },
});

export const {
  basketAdd,
  basketRemove,
  basketIncrement,
  basketDecrement,
  basketIsChecked,
  basketIsCheckedAll,
  basketDeleteSelected
} = basketSlice.actions;

export const getBasketSelector = (state) => state.basket;

export const basketReducer = basketSlice.reducer;
