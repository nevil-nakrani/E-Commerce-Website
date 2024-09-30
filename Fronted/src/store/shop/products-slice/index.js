import axios from "axios";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

export const showAllFilteredProducts = createAsyncThunk(
  "/products/showAllFilteredProducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const result = await axios.get(
      `http://localhost:8000/shop/products/get?${query}`
    );
    return result?.data;
  }
);
export const showProductDetails = createAsyncThunk(
  "/products/showProductDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:8000/shop/products/get/${id}`
    );
    return result?.data;
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(showAllFilteredProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(showAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(showAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(showProductDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(showProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(showProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export default shoppingProductSlice.reducer;
