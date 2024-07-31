import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axioKit } from "../../utilities";

const name = "statistics";

const initialState = {
  collections: {},
  progress: 0,
  isSuccess: false,
  isLoading: false,
  message: "",
  advice: "",
};

export const USERS = createAsyncThunk(`${name}/users`, (form, thunkAPI) => {
  try {
    return axioKit.universal(`${name}/users`, form.token, form.key);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const ADMIN = createAsyncThunk(`${name}/admin`, (form, thunkAPI) => {
  try {
    return axioKit.universal(`${name}/admin`, form.token, form.key);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const BOT = createAsyncThunk(`${name}/bot`, (form, thunkAPI) => {
  try {
    return axioKit.universal(`${name}/bot`, form.token, form.key);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const reduxSlice = createSlice({
  name,
  initialState,
  reducers: {
    RESET: (state, data) => {
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: builder => {
    builder
      .addCase(USERS.pending, state => {
        state.isLoading = true;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(USERS.fulfilled, (state, action) => {
        const { payload } = action.payload;
        state.collections = payload;
        state.isLoading = false;
      })
      .addCase(USERS.rejected, (state, action) => {
        const { error } = action;
        state.message = error.message;
        state.isLoading = false;
      })
      .addCase(ADMIN.pending, state => {
        state.isLoading = true;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(ADMIN.fulfilled, (state, action) => {
        const { payload } = action.payload;
        state.collections = payload;
        state.isLoading = false;
      })
      .addCase(ADMIN.rejected, (state, action) => {
        const { error } = action;
        state.message = error.message;
        state.isLoading = false;
      })
      .addCase(BOT.pending, state => {
        state.isLoading = true;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(BOT.fulfilled, (state, action) => {
        const { payload } = action.payload;
        state.advice = payload;
        state.isLoading = false;
      })
      .addCase(BOT.rejected, (state, action) => {
        const { error } = action;
        state.message = error.message;
        state.isLoading = false;
      });
  },
});

export const { RESET } = reduxSlice.actions;

export default reduxSlice.reducer;
