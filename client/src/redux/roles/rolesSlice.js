// src/redux/roles/rolesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	selectedRole: null,
};

const rolesSlice = createSlice({
	name: "roles",
	initialState,
	reducers: {
		setSelectedRole(state, action) {
			state.selectedRole = action.payload;
		},
	},
});

export const { setSelectedRole } = rolesSlice.actions;
export default rolesSlice.reducer;
