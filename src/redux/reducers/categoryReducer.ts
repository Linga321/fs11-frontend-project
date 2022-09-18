import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Category } from "../types/category";

const initialState: { categoryList: Category[] } = {
  categoryList: [],
};

export const fetchCategory = createAsyncThunk("fetchCategory", async () => {
  const data = await fetch("https://api.escuelajs.co/api/v1/categories");
  const result = await data.json();
  return result;
});

const categorySlicer = createSlice({
  name: "categoryReducer",
  initialState: initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categoryList.push({
        id: action.payload.id,
        name: action.payload.name,
        image: action.payload.image,
      });
    },
    deleteCategory: (state, action) => {
      state.categoryList = state.categoryList.filter(
        (category) => category.id != action.payload.id
      );
    },
    updateCategory: (state, action) => {
      state.categoryList = state.categoryList.map((category) => {
        if (category.id == action.payload.id) {
          return action.payload;
        } else {
          return category;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.categoryList = action.payload;
    });
  },
});

export const categoryReducer = categorySlicer.reducer;
export const { addCategory, deleteCategory, updateCategory } =
  categorySlicer.actions;
