import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from "../products/productSlice";
import { addedTocartProduct } from "../cart/cartSlice";
import Spinner from '../../components/Spinner';
import Alert from '@mui/material/Alert';
import { Link } from "react-router-dom";
import ButtonGroup from '@mui/material/ButtonGroup';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { toast, ToastContainer } from 'react-toastify';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export default function Product() {
  const { productsList, status, error } = useSelector((state) => state.products);
  const { cartList } = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1)
  const perPageItem = 10;
  const startIndex = pageNumber * perPageItem - perPageItem;  //1* 10 - 10=1
  const lastIndex = startIndex + perPageItem; // 1 + 10 =11
  const myproduct = productsList.slice(startIndex, lastIndex)
  const page = [];
  for (let i = 1; i <= productsList.length / perPageItem; i++) {
    page.push(i)
  }



  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  const handleChange = (event, value) => {
    event.preventDefault()
    setPageNumber(value);
  };

  const addToCartHandler = (item) => {
    dispatch(addedTocartProduct(item))

    toast.success(' Item added to cart!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  }


  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        {status === 'pending' && <Spinner />}
        {status !== 'pending' && error && <Alert severity="error">{error}</Alert>}
        <ToastContainer style={{ fontSize: "18px" }} />
        <Grid container spacing={2}>
          {myproduct.map((item) => {
            return <Grid key={item.id} xs={12} md={6} lg={4} >
              <Card sx={{ maxWidth: 345,height:'100%' }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={item.thumbnail}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}{item.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    Price: ₹{item.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <ButtonGroup sx={{ width: '100%', boxShadow: 'none' }} variant="contained" aria-label="outlined primary button group">
                    <Link className='view-details' to={`/product/${item.id}`}>View Details</Link>
                    <Button disabled={cartList && cartList?.find(e => e.id === item.id)} sx={{ width: '50%', borderRadius: '0 4px 4px 0' }} size="medium" onClick={() => addToCartHandler(item)}> {cartList?.find(e => e.id === item.id) ? <ThumbUpIcon /> : 'Add To Cart'} </Button>
                  </ButtonGroup>

                </CardActions>
              </Card>
            </Grid>
          })}
        </Grid>
        {productsList.length >0 &&
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Stack spacing={2}>
            <Pagination count={Math.floor(productsList.length / perPageItem)} page={pageNumber} onChange={handleChange} color="primary" />
          </Stack>
        </Grid>}

      </Box>
    </div>
  );
}
