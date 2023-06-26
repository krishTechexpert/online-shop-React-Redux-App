import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  productsList: [],
  status:'idle'

};


// The function below is called a thunk and allows us to perform async logic.

export const getAllProducts = createAsyncThunk(
  'api/getProducts',
  async () => {
    const response = await axios.get('http://localhost:3005/products');
    return response.data;
  }
);

export const singleProducts = createAsyncThunk(
  'api/singleProduct',
  async (id) => {
    const response = await axios.get(`http://localhost:3005/products/${id}`);
    return response.data;
  }
);


export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get All products
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status='pending'
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status='idle';
        state.error=action.error.message;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status='idle';
        state.productsList=action.payload;
      })
      // get Single product
      .addCase(singleProducts.pending, (state) => {
        state.status='pending';
        state.singleProduct=null;
      })
      .addCase(singleProducts.rejected, (state, action) => {
        state.status='idle';
        state.error=action.error.message;
      })
      .addCase(singleProducts.fulfilled, (state, action) => {
        state.status='idle';
        state.singleProduct=action.payload;
      });
  },
});

export const { } = productSlice.actions;


export default productSlice.reducer;
