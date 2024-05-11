import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	timeLeft: 3600,
	isActive: false,
};

export const timerSlice = createSlice({
	name: "timer",
	initialState,
	reducers: {
		setTimeLeft: (state, action) => {
			state.timeLeft = action.payload;
		},
		startTimer: (state, action) => {
			state.timeLeft = action.payload;
			state.isActive = true;
		},
		decrementTimer: (state) => {
			if (state.timeLeft > 0) {
				state.timeLeft -= 1;
			}
		},
		stopTimer: (state) => {
			state.isActive = false;
		},
		resetTimer: (state) => {
			state.timeLeft = null;
			state.isActive = false;
		},
	},
});

export const {
	setTimeLeft,
	startTimer,
	decrementTimer,
	stopTimer,
	resetTimer,
} = timerSlice.actions;

export default timerSlice.reducer;
