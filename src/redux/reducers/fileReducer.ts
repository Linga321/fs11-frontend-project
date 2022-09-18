import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { File } from "../types/file";

const initialState: File = {
  originalName: "",
  fileName: "",
  location: "",
};

export const fetchFile = createAsyncThunk("fetchFile", async (fileName : string) => {
  const data = await fetch(`https://api.escuelajs.co/api/v1/files/${fileName}`);
  const result = await data.json();
  return result;
});

export const uploadFile = createAsyncThunk(
  "uploadFile",
  async (filedata: string | Blob) => {
    const formData = new FormData();
    formData.append("file", filedata);
    const settings = {
      method: "POST",
      body: formData,
    };
    const data = await fetch(
      "https://api.escuelajs.co/api/v1/files/upload",
      settings
    );
    const result = await data.json();
    return result;
  }
);

const fileSlicer = createSlice({
  name: "fileReducer",
  initialState: initialState,
  reducers: {
    addFile: (state, action) => {
      state = action.payload;
    },
    deleteFile: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFile.fulfilled, (state, action) => {
        state.fileName = action.payload.filename;
        state.originalName = action.payload.originalname;
        state.location = action.payload.location;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.fileName = action.payload.filename;
        state.originalName = action.payload.originalname;
        state.location = action.payload.location;
      });
  },
});

export const fileReducer = fileSlicer.reducer;
export const { addFile, deleteFile } = fileSlicer.actions;
