import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { levelsScore: Record<string, number> } = {
  levelsScore: {},
};

const levelsSlice = createSlice({
  name: "levels",
  initialState,
  reducers: {
    setLevelScore: (
      state,
      action: PayloadAction<{ levelid: string; countMistakes: number }>
    ) => {
      const { levelid, countMistakes } = action.payload;

      if (state.levelsScore[levelid] === 0) {
        return;
      }

      if (!state.levelsScore[levelid]) {
        state.levelsScore[levelid] = countMistakes;
      }

      if (countMistakes < state.levelsScore[levelid]) {
        state.levelsScore[levelid] = countMistakes;
      }
    },
  },
});

const levelsReducer = levelsSlice.reducer;
export const { setLevelScore } = levelsSlice.actions;

export default levelsReducer;
