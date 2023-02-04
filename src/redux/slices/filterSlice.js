import { createSlice } from "@reduxjs/toolkit"
import { initState } from "../initState"

const filterSlice = createSlice({
	name: 'filter',
	initialState: initState.filter,
	reducers: {
		filterSearch(state, action) {
			state.search = action.payload
		},
	}
})

export const { filterSearch } = filterSlice.actions

export const getSearchFromImput = state => state.filter.search

export const filterReducer = filterSlice.reducer