import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { Product } from "../types/product"

const initialState: { productList: Product[] } = {
  productList: [],
}
/**
 * #(params)
 */
export const fetchProducts = createAsyncThunk(
  "fetchProduct",
  async (params: string) => {
    const data = await fetch(
      `https://api.escuelajs.co/api/v1/products?${params}`
    )
    const result = await data.json()
    return result
  }
)

const productSlicer = createSlice({
  name: "productReducer",
  initialState: initialState,
  reducers: {
    addProduct: (state, action) => {
      state.productList.push({
        id: action.payload.id,
        title: action.payload.title,
        price: action.payload.price,
        description: action.payload.description,
        category: {
          id: action.payload.category.id,
          name: action.payload.category.name,
          image: action.payload.category.image,
        },
        images: action.payload.images,
      })
    },
    deleteProduct: (state, action) => {
      state.productList = state.productList.filter(
        (product) => product.id != action.payload.id
      )
    },
    updateProduct: (state, action) => {
      state.productList = state.productList.map((product)=> {
        if( product.id == action.payload.id ) {
          return action.payload
        } else {
          return product;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => { 
      // for keeping the old data
      action.payload.map((product : Product)=>state.productList.push(product))
    })
  },
})

export const productReducer = productSlicer.reducer
export const { addProduct, deleteProduct, updateProduct } = productSlicer.actions
