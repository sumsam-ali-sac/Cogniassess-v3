import { createSlice } from "@reduxjs/toolkit";

export const assessmentSlice = createSlice({
	name: "assessment",
	initialState: {
		points: 0,
		feedback: "",
	},
	reducers: {
		setPoints: (state, action) => {
			state.points = action.payload;
		},
		setFeedback: (state, action) => {
			state.feedback = action.payload;
		},
	},
});

export const { setPoints, setFeedback } = assessmentSlice.actions;

export default assessmentSlice.reducer;
