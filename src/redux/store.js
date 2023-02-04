import { configureStore } from '@reduxjs/toolkit'
import { getInitState } from './initState';
import { basketReducer } from './slices/basketSlice';
import { filterReducer } from './slices/filterSlice';
import {userReducer} from "./slices/userSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        basket: basketReducer,
        filter: filterReducer
    },
    preloadedState: getInitState()
  })


  store.subscribe(() => {
    window.localStorage.setItem("REDUX", JSON.stringify(store.getState()));
  });