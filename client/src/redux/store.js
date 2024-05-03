import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/userSlice";
import domainsReducer from "./domains/domainsSlice";
import rolesReducer from "./roles/rolesSlice";
import questionsReducer from "./questions/questionsSlice";

const rootReducer = combineReducers({
	user: userReducer,
	domains: domainsReducer,
	roles: rolesReducer,
	questions: questionsReducer,
});

const persistConfig = {
	key: "root",
	storage,
	version: 1,
	whitelist: ["user", "roles", "domains"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
	devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
