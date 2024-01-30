import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	accessToken: localStorage.getItem('access_token') || null,
	refreshToken: localStorage.getItem('refresh_token') || null,
};

export const counterSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		storeAccessToken: (state, action) => {
			state.accessToken = action.payload;
		},
		storeRefreshToken: (state, action) => {
			state.refreshToken = action.payload;
		},
		clearAccessToken: (state, action) => {
			state.accessToken = null;
		},
		clearRefreshToken: (state, action) => {
			state.refreshToken = null;
		},
		clearAllTokens: (state, action) => {
			state.accessToken = null;
			state.refreshToken = null;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	storeAccessToken,
	storeRefreshToken,
	clearAccessToken,
	clearAllTokens,
	clearRefreshToken,
} = counterSlice.actions;

export const getAccessToken = (state) => state.auth.accessToken;

export default counterSlice.reducer;
