import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { ProductCart } from "../types/cart"

const initialState: { cartList: ProductCart[]  } = {
  cartList: [] ,
}

export const fetchProducts = createAsyncThunk("fetchUser", async () => {
  const data = await fetch(
    "https://api.escuelajs.co/api/v1/products?offset=0&limit=10"
  )
  const result = await data.json()
  return result
})

const cartSlicer = createSlice({
  name: "cartReducer",
  initialState: initialState,
  reducers: {
    addCart: (state, action) => {
      state.cartList.push({
        product: action.payload.cart,
        quantity: 1,
      })
    },
    addQuantityCart: (state, action) => {
      state.cartList = state.cartList.map((cart) => {
        if (cart.product.id === action.payload.id) {
          cart.quantity = cart.quantity + 1
        }
        return cart
      })
    },
    minusQuantityCart: (state, action) => {
      state.cartList = state.cartList.map((cart) => {
        if (cart.product.id === action.payload.id) {
          if (cart.quantity == 1) {
            //cartSlicer.caseReducers.deleteCart(state, action)
            state.cartList = state.cartList.filter(
              (prodart) => prodart.product.id != action.payload.id
            )
          } else {
            cart.quantity = cart.quantity - 1
          }
        }
        return cart
      })
    },
    deleteCart: (state, action) => {
      state.cartList = state.cartList.filter(
        (prodart) => prodart.product.id != action.payload.id
      )
    },
  },
  extraReducers: (builder) => {},
})

export const cartReducer = cartSlicer.reducer
export const { addCart, deleteCart, addQuantityCart, minusQuantityCart } =
  cartSlicer.actions
