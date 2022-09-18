import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import {
  UserToken,
  User,
  UserLogin,
  UserData,
  UserRegister,
} from "../types/user"

const initialState: UserData = {
  userList: [],
  userAuth: undefined,
  userLogin: undefined, // for remember me
  userToken: undefined,
}

export const fetchUsers = createAsyncThunk("fetchUser", async () => {
  const data = await fetch("https://api.escuelajs.co/api/v1/users")
  const result = await data.json()
  return result
})

export const loginUser = createAsyncThunk(
  "loginUser",
  async (params: UserLogin) => {
    const settings = {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
    const data = await fetch(
      "https://api.escuelajs.co/api/v1/auth/login",
      settings
    )
    const result = await data.json()
    if(data.status === 201 || data.status === 404 || data.status >=500){
      return result
    }else{
      return undefined
    }
  }
)

export const registerUser = createAsyncThunk(
  "registerUser",
  async (params: UserRegister) => {
    const settings = {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
    const data = await fetch(
      "https://api.escuelajs.co/api/v1/users/",
      settings
    )
  
    const result = await data.json()
    if(data.status == 201){
      return result
    }else{
      return undefined
    }
  }
)

export const authUser = createAsyncThunk(
  "authUser",
  async (params: any) => {
    const settings = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${params}`,
      },
    }
    const data = await fetch(
      "https://api.escuelajs.co/api/v1/auth/profile",
      settings
    )
    const result = await data.json()
    return result
  }
)

const userSlicer = createSlice({
  name: "userReducer",
  initialState: initialState,
  reducers: {
    addUser: (state, action) => {
      state.userList.push({
        id: action.payload.id,
        email: action.payload.email,
        password: action.payload.password,
        name: action.payload.name,
        role: action.payload.role,
        avatar: action.payload.avatar,
      })
    },
    deleteUser: (state, action) => {
      state.userList = state.userList.filter(
        (user) => user.id != action.payload.id
      )
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.userList = action.payload
    })
  },
})

const authSlicer = createSlice({
  name: "userReducer",
  initialState: initialState,
  reducers: {
    logout: (state, action) => {
      state.userAuth = action.payload
      state.userLogin = action.payload
    },
    editProfile: (state, action) => {
      state.userAuth = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.userList = action.payload
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userToken = action.payload
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.userAuth = action.payload
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userList.push(action.payload)
      })
  },
})

export const userReducer = userSlicer.reducer
export const authReducer = authSlicer.reducer
export const { logout, editProfile } = authSlicer.actions
export const { addUser, deleteUser } = userSlicer.actions
