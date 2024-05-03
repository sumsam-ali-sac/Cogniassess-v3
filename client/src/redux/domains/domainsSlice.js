import { createSlice } from "@reduxjs/toolkit";

export const domainsSlice = createSlice({
	name: "domains",
	initialState: {
		selectedDomains: {},
	},
	reducers: {
		setSelectedDomains: (state, action) => {
			state.selectedDomains = action.payload;
			console.log(state.selectedDomains);
		},
	},
});

export const { addOrUpdateDomain, setSelectedDomains } = domainsSlice.actions;

export default domainsSlice.reducer;
