import { createSlice } from "@reduxjs/toolkit";

const initialState: { countHint: number; hintDialLevel: number } = {
  countHint: 0,
  hintDialLevel: 0,
};

const hintsSlice = createSlice({
  name: "hints",
  initialState,
  reducers: {
    makeTrueAnswer: (state) => {
      const newHintDialLevel = state.hintDialLevel + 1;

      if (newHintDialLevel >= 4) {
        state.countHint = state.countHint + 1;
        state.hintDialLevel = 0;
      } else {
        state.hintDialLevel = newHintDialLevel;
      }
    },
    takeHint: (state) => {
      if (state.countHint > 0) {
        state.countHint = state.countHint - 1;
      }
    },
  },
});

const hintsReducer = hintsSlice.reducer;
export const { makeTrueAnswer, takeHint } = hintsSlice.actions;

export default hintsReducer;
