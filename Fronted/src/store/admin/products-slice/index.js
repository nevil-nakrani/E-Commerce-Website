import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/add",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:8000/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const showAllProducts = createAsyncThunk("/products/get", async () => {
  const result = await axios.get("http://localhost:8000/admin/products/get");
  return result?.data;
});

export const editProduct = createAsyncThunk(
  "/products/edit",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:8000/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/delete",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:8000/admin/products/delete/${id}`
    );
    return result?.data;
  }
);

const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(showAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(showAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default adminProductsSlice.reducer;
