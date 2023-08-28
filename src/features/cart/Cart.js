import React, { useEffect, useState } from 'react'
import "./cart.css";
import { Link, useNavigate } from 'react-router-dom';
import { fetchcartProducts, deleteCartItems, updateCartItems } from "../cart/cartSlice";
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';



export default function Cart() {
  const { cartList, status, error, totalAmount } = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchcartProducts())
  }, [])


  const increaseQtyhandler = (id) => {
    const product = cartList.find(item => item.id === id)
    // imp here blow line in case of edit
    dispatch(updateCartItems({ id, updateQty: { qty: product.qty + 1 } }))
  }
  const decreaseQtyhandler = (id) => {
    const product = cartList.find(item => item.id === id)

    // imp here blow line in case of edit
    if (product.qty > 1) {
      dispatch(updateCartItems({ id, updateQty: { qty: product.qty - 1 }}))
    }

  }

  return <>
    <main>
      <div className="basket">
        {cartList && cartList?.length > 0 && <div className="basket-labels">
          <ul>
            <li className="item item-heading">Item</li>
            <li className="price">Price</li>
            <li className="quantity">Quantity</li>
            <li className="subtotal">Subtotal</li>
          </ul>
        </div>}
        {cartList && cartList?.length > 0 && cartList?.map((product) => {
          return <div className="basket-product">
            <div className="item">
              <div className="product-image">
                <img src={product.thumbnail} alt={product.title} className="product-frame" />
              </div>
              <div className="product-details">
                <strong> {product.brand}</strong><br></br>
                <Link to={`/product/${product.id}`} style={{ fontSize: '20px', pt: 2, color: '#000' }}>{product.title}</Link>
              </div>
            </div>
            <div className="price">{product.price} </div>
            <div className="quantity">

              <ButtonGroup>
                <Button
                  aria-label="reduce"
                  onClick={() => {
                    decreaseQtyhandler(product.id)
                  }}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
                <TextField
                  hiddenLabel
                  name={`product-${product.id}`}
                  label="Qty"
                  sx={{ width: '50px' }}
                  InputProps={{
                    readOnly: true,
                  }}
                  value={product.qty}
                />
                <Button
                  aria-label="increase"
                  onClick={() => {
                    increaseQtyhandler(product.id)
                  }}
                >
                  <AddIcon fontSize="small" />
                </Button>
              </ButtonGroup>

            </div>

            <div className="subtotal">{product.price * product.qty}</div>
            <div className="remove">
              <button onClick={() => dispatch(deleteCartItems(product.id))}><DeleteForeverIcon style={{ color: 'red', cursor: 'pointer' }} /></button>
            </div>
          </div>
        })
        }

      </div>
      {cartList && cartList?.length > 0 ?
        <aside>
          <div className="summary">
            <div className="summary-total-items"><span className="total-items"></span> (<strong>{cartList && cartList?.length}</strong>) Items in your Bag</div>

            <div className="summary-total">
              <div className="total-title">Total</div>
              <div className="total-value final-value" id="basket-total">{totalAmount}</div>
            </div>
            <div className="summary-checkout">
              <button className="checkout-cta" variant="contained">Go to Secure Checkout</button>
            </div>
          </div>
        </aside>:
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
         <div className="empty-product">
          <h3  className='one' id="one">There are no products in your cart.</h3>
          <Button variant="contained" onClick={() => { navigate('/') }}>Shopping now</Button>
        </div>
      </Grid>}
    </main>
  </>
}

