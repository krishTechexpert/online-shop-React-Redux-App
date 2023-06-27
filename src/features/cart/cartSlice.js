import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

//axios.defaults.baseURL = 'http://localhost:3005';

axios.defaults.baseURL = 'https://main--jazzy-travesseiro-c2c8c5.netlify.app';


const initialState = {
  cartList: [],
  status:'idle',
  totalAmount:0
};

// The function below is called a thunk and allows us to perform async logic.
export const fetchcartProducts = createAsyncThunk(
  'api/cart/getproducts',
  async () => {
    const response = await axios.get(`/carts`);
    return response.data;
  }
);
export const addedTocartProduct = createAsyncThunk(
  'api/cart/addproduct',
  async (item) => {
    const response = await axios.post(`/carts`,{...item,qty:1});
    return response.data;
  }
);

export const deleteCartItems = createAsyncThunk(
  'api/cart/deleteproduct',
  async (id) => {
    const response = await axios.delete(`/carts/${id}`);
    return id;
  }
);
export const updateCartItems = createAsyncThunk(
  'api/cart/updateproduct',
  async ({id,updateQty,operation}) => {
    const response = await axios.patch(`/carts/${id}`,updateQty);
    response.data.symbol=operation;
    return response.data;
  }
);



export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addedTocartProduct.fulfilled, (state, action) => {
        state.status='idle';
        state.cartList=[...state.cartList,action.payload];
        state.totalAmount = state.totalAmount + action.payload.price * action.payload.qty 
      })
      .addCase(fetchcartProducts.fulfilled, (state, action) => {
        state.status='idle';
        state.cartList=action.payload;
        state.totalAmount =  state.cartList.map(item => item.price * item.qty).reduce((sum,val) =>sum + val,0)
      })
      .addCase(deleteCartItems.fulfilled, (state, action) => {
        state.status='idle';
        const product = state.cartList.find((item) => item.id === action.payload)
        state.totalAmount = state.totalAmount - (product.price * product.qty)

        state.cartList= state.cartList.filter(item => item.id !== action.payload)
      })
      .addCase(updateCartItems.fulfilled, (state, action) => {
        state.status='idle';
        const index= state.cartList.findIndex(item => item.id === action.payload.id)
        state.cartList.splice(index,1,action.payload)
        if(action.payload.symbol === 'ADD'){
          state.totalAmount = state.totalAmount + action.payload.price
        }else{
          state.totalAmount = state.totalAmount - action.payload.price
        }
         
      });
  },  
});

export const { } = cartSlice.actions;
export default cartSlice.reducer;
