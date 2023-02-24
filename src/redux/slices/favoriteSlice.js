import { createSlice } from "@reduxjs/toolkit";
import { initState } from "../initState";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: initState.favorite,
  reducers: {
    favoriteAdd(state, actions) {
      const product = {
        id: actions.payload,
        isChecked: false,
      };
      state.push(product);
    },
    favoriteRemove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    favoriteIsChecked(state, actions) {
      state.map((item) => {
        if (item.id === actions.payload) {
          return (item.isChecked = !item.isChecked);
        }
        return item;
      });
    },
    favoriteIsCheckedAll(state, actions) {
      state.map((item) => (item.isChecked = actions.payload));
    },
    favoriteDeleteSelected(state) {
      return state.filter((item) => item.isChecked !== true);
    }
  }
})

export const {
  favoriteAdd,
  favoriteRemove,
  favoriteIsChecked,
  favoriteIsCheckedAll,
  favoriteDeleteSelected,
} = favoriteSlice.actions

export const getfavoriteSelector = (state) => state.favorite;

export const favoriteReducer = favoriteSlice.reducer;
