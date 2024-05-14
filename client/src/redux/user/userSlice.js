import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../../firebase";

const initialState = {
	user: null,
	isLoading: false,
	error: null,
};

// Asynchronous thunk for signing up a user
export const signUpUser = createAsyncThunk(
	"user/signUp",
	async (userData, { rejectWithValue }) => {
		try {
			const response = await fetch("/api/node/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(userData),
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message || "Unable to sign up");
			}
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// Asynchronous thunk for signing in a user
export const signInUser = createAsyncThunk(
	"user/signIn",
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await fetch("/api/node/auth/signin", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(credentials),
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.message || "Unable to sign in");
			}
			return data.user;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

// Asynchronous thunk for Google sign-in
export const signInWithGoogle = createAsyncThunk(
	"user/signInWithGoogle",
	async (_, { rejectWithValue, dispatch }) => {
		try {
			const provider = new GoogleAuthProvider();
			const auth = getAuth(app);
			const result = await signInWithPopup(auth, provider);
			const user = result.user;

			const userData = {
				username: user.displayName,
				email: user.email,
				avatar: user.photoURL,
			};

			const response = await fetch("/api/node/auth/google", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(
					data.message || "Failed to process user data on the server"
				);
			}
			const data = await response.json();
			return data.user;
		} catch (error) {
			if (error.code === "auth/popup-closed-by-user") {
				dispatch(setLoading(false)); // Adjust according to your actual action to set loading state
			}
			return rejectWithValue(error.message);
		}
	}
);

// Slice definition
const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logoutUser(state) {
			state.user = null;
			state.isLoading = false;
			state.error = null;
		},
		clearError(state) {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(signUpUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(signUpUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
			})
			.addCase(signUpUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(signInUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(signInUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload;
			})
			.addCase(signInUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(signInWithGoogle.pending, (state) => {
				state.isLoading = false;
				state.error = null;
			})
			.addCase(signInWithGoogle.fulfilled, (state, action) => {
				console.log(action.payload);
				state.isLoading = false;
				state.user = action.payload;
			})
			.addCase(signInWithGoogle.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { logoutUser, clearError } = userSlice.actions;
export default userSlice.reducer;
