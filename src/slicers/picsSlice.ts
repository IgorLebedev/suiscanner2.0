import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

interface IPicsState {
  pics: Array<any>
}

const initialState: IPicsState = {
  pics: [],
};

const picsReducer = createSlice({
  name: 'pics',
  initialState,
  reducers: {
    addPics: (state, action: PayloadAction<Array<any>>) => {
      state.pics = state.pics.concat(action.payload);
    },
    clearPics: (state) => {
      state.pics = [];
    },
  },
});

export const { addPics, clearPics } = picsReducer.actions;

export default picsReducer.reducer;