import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const questionsSlice = createSlice({
	name: "questions",
	initialState,
	reducers: {
		addQuestions(state, action) {
			const existingEntryIndex = state.findIndex(
				(entry) => entry.domain === action.payload.domain
			);
			if (existingEntryIndex === -1) {
				const newEntry = {
					...action.payload,
					questions: action.payload.questions.map((question) => ({
						...question,
						answer: "",
						solved: false,
					})),
					progress: 0,
					status: "Not started",
				};
				state.push(newEntry);
			}
		},

		toggleSolved(state, action) {
			const { entryIndex, questionId } = action.payload;
			const entry = state[entryIndex];
			if (entry && entry.questions) {
				const question = entry.questions.find(
					(q) => q.id === questionId
				);
				if (question) {
					question.solved = !question.solved;
				}
				// Automatically update progress and status whenever a question is toggled
				questionsSlice.caseReducers.updateProgress(state, {
					payload: { entryIndex },
				});
				questionsSlice.caseReducers.updateStatus(state, {
					payload: { entryIndex },
				});
			}
		},

		saveAnswer(state, action) {
			const { entryIndex, question } = action.payload;
			const entry = state[entryIndex];
			if (entry && entry.questions) {
				const questionIndex = entry.questions.findIndex(
					(q) => q.id === question.id
				);
				if (questionIndex !== -1) {
					entry.questions[questionIndex] = question;
				}
			}
		},

		updateProgress(state, action) {
			const { entryIndex } = action.payload;
			const entry = state[entryIndex];
			if (entry && entry.questions) {
				const totalQuestions = entry.questions.length;
				const solvedQuestions = entry.questions.filter(
					(q) => q.solved
				).length;
				entry.progress = Math.round(
					(solvedQuestions / totalQuestions) * 100
				);
			}
		},

		updateStatus(state, action) {
			const { entryIndex } = action.payload;
			const entry = state[entryIndex];
			if (entry) {
				const allSolved = entry.questions.every((q) => q.solved);
				entry.status = allSolved ? "Completed" : "In Progress";
			}
		},
	},
});

export const {
	addQuestions,
	toggleSolved,
	updateProgress,
	updateStatus,
	saveAnswer,
} = questionsSlice.actions;
export default questionsSlice.reducer;
