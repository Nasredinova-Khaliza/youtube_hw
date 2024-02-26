import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface CreateType {
	_id?: number;
	title: string;
	video: string;
	genre: string;
}

interface HomeState {
	loading: boolean;
	error: string | null;
	data: CreateType[];
}

const initialState: HomeState = {
	loading: false,
	error: null,
	data: [],
};

const url =
	"https://api.elchocrud.pro/api/v1/062f63764f79ba0dbc86033e9c912aad/practice";

export const getRequest = createAsyncThunk("video/getRequest", async () => {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
});

export const postRequest = createAsyncThunk(
	"video/postRequest",
	async (newVideo: CreateType) => {
		try {
			const response = await axios.post(url, newVideo);
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

export const deleteRequest = createAsyncThunk(
	"video/deleteRequest",
	async (id: number) => {
		try {
			await axios.delete(`${url}/${id}`);
			return id;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

export const editRequest = createAsyncThunk(
	"video/editRequest",
	async ({ _id, title, genre, video }: CreateType) => {
		try {
			const response = await axios.patch(`${url}/${_id}`, {
				title,
				video,
				genre,
			});
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

const homeSlice = createSlice({
	name: "HomeSlice",
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getRequest.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(getRequest.fulfilled, (state, action) => {
			state.loading = false;
			state.data = action.payload;
		});
		builder.addCase(getRequest.rejected, (state, action) => {
			state.loading = false;
			state.error = action.error.message as string;
		});
		builder.addCase(postRequest.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(postRequest.fulfilled, (state, action) => {
			state.data.push(action.payload);
			state.loading = false;
		});
		builder.addCase(postRequest.rejected, (state, action) => {
			state.error = action.error.message as string;
			state.loading = false;
		});
		builder.addCase(deleteRequest.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(deleteRequest.fulfilled, (state, action) => {
			state.data = state.data.filter((item) => item._id !== action.payload);
			state.loading = false;
		});
		builder.addCase(deleteRequest.rejected, (state, action) => {
			state.error = action.error.message as string;
			state.loading = false;
		});
		builder.addCase(editRequest.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(editRequest.fulfilled, (state, action) => {
			state.loading = false;
			const editedVideoIndex = state.data.findIndex(
				(video) => video._id === action.payload._id
			);
			if (editedVideoIndex !== -1) {
				state.data[editedVideoIndex] = action.payload;
			}
		});
		builder.addCase(editRequest.rejected, (state, action) => {
			state.error = action.error.message as string;
			state.loading = false;
		});
	},
});

export const videoReducer = homeSlice.reducer;
