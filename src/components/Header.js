import React,{useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import {fetchcartProducts} from "../features/cart/cartSlice";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { useSelector, useDispatch } from 'react-redux';
export default function Header() {
  const {cartList} = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchcartProducts())
  },[])
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link to='/' style={{textDecoration:'none'}}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: 'flex',alignItems: 'center',color:'#fff' } }
          >
          <PhoneIphoneIcon />Mo<span style={{color:'#ed6c02'}}>b</span>ile
          </Typography>
          </Link> 
         
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { md: 'flex' } }}>
            <Link to="/mycart">
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={cartList?.length>0 ? cartList?.length :0} color="warning">
                <AddShoppingCartIcon style={{color:'#fff'}} />
              </Badge>
            </IconButton>
            </Link>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              //aria-controls={}
              aria-haspopup="true"
              onClick={() => {}}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
                  </Toolbar>
      </AppBar>
    
    </Box>
  );
}