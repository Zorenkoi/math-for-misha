import { createSlice } from "@reduxjs/toolkit";

const initialState: { theme: "dark" | "light" } = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

const themeReducer = themeSlice.reducer;
export const { toggleTheme } = themeSlice.actions;

export default themeReducer;
