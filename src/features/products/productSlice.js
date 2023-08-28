import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

//axios.defaults.baseURL = 'http://localhost:3005';
axios.defaults.baseURL = 'https://krishstore.onrender.com/api';

const initialState = {
  productsList: [],
  status:null

};


// The function below is called a thunk and allows us to perform async logic.

export const getAllProducts = createAsyncThunk(
  'api/getProducts',
  async () => {
    const response = await axios.get('/products');
    return response.data;
  }
);

export const singleProducts = createAsyncThunk(
  'api/singleProduct',
  async (id) => {
    const response = await axios.get(`/products/${id}`);
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
        state.status='pending';
        state.error=null;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status=null;
        state.error=action.error.message;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status=null;
        state.error=null;
        state.productsList=action.payload;
      })
      // get Single product
      .addCase(singleProducts.pending, (state) => {
        state.status='pending';
        state.error=null;
        state.singleProduct=null;
      })
      .addCase(singleProducts.rejected, (state, action) => {
        state.status=null;
        state.error=action.error.message;
      })
      .addCase(singleProducts.fulfilled, (state, action) => {
        state.status=null;
        state.error=null;
        state.singleProduct=action.payload;
      });
  },
});

export const { } = productSlice.actions;


export default productSlice.reducer;
