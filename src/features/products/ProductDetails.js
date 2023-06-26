import React,{useEffect,useState} from 'react';
import { useParams } from "react-router-dom";
import { useSelector , useDispatch} from 'react-redux';
import {singleProducts} from "../products/productSlice";
import {addedTocartProduct} from "../cart/cartSlice";
import { toast, ToastContainer } from 'react-toastify';
import {updateCartItems} from "../cart/cartSlice";

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Grid from '@mui/material/Unstable_Grid2';
import Rating from '@mui/material/Rating';
import Spinner from '../../components/Spinner';
import Alert from '@mui/material/Alert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TextField from '@mui/material/TextField';


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


export default function ProductDetails() {
    let { id } = useParams();
    const dispatch = useDispatch();
    const {singleProduct:product,status,error} = useSelector((state) => state.products)
    const {cartList} = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(singleProducts(id))
  },[])


    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = product && product?.images?.length;
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleStepChange = (step) => {
      setActiveStep(step);
    };

    const addToCartHandler =  (item) => {
      dispatch(addedTocartProduct(item))
      
      toast.success(' Item added to cart!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      
    }


  const increaseQtyhandler = (id) => {
    const product=cartList.find(item => item.id=== id)
    // imp here blow line in case of edit
    dispatch(updateCartItems({id,updateQty:{qty:product.qty+1},operation:'ADD'}))
  }
  const decreaseQtyhandler = (id) => {
    const product=cartList.find(item => item.id=== id)
   
    // imp here blow line in case of edit
    if(product.qty>0){
      dispatch(updateCartItems({id,updateQty:{qty:Math.max(product.qty-1,0)},operation:'Subtract'}))
    }
    
  }

  return (
    <div>
        {status === 'pending' && <Spinner />}
        {status !== 'pending' && error && <Alert severity="error">{error}</Alert>}
        <ToastContainer style={{ fontSize: "18px" }}/> 
         {product && <Grid container spacing={2}> 
        
            <Grid  xs={4}>
                <Box sx={{ flexGrow: 1 }}>
            
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {product && product?.images?.map((item, index) => (
                <div key={index}>
                    {Math.abs(activeStep - index) <= 2 ? (
                    <Box
                        component="img"
                        sx={{
                          height: 300,
                          display: 'block',
                          maxWidth: 400,
                          overflow: 'hidden',
                          width: '100%',
                        }}
                        src={item}
                        alt=""
                    />
                    ) : null}
                </div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                <Button
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                >
                    Next
                    {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                    ) : (
                    <KeyboardArrowRight />
                    )}
                </Button>
                }
                backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                    ) : (
                    <KeyboardArrowLeft />
                    )}
                    Back
                </Button>
                }
            />
                </Box> 
            </Grid> 
            <Grid xs={8} sx={{paddingLeft:'50px'}}>
                
                <Typography gutterBottom variant="h4" component="div">
                {product?.title}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                {product?.category} by <strong>{product?.brand}</strong>
                </Typography>
                
                <Rating  sx={{mt:2,mb:2}} name="read-only" value={product?.rating} precision={0.5} readOnly />
                <Typography color="text.secondary" variant="body1" sx={{mb:2}}>
                    {product?.description}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    Price : ₹{product?.price}
                </Typography>
                <Typography color="text.primary" variant="body1" sx={{mb:2}}>
                    In Stock: <span style={{color:'green'}}>{product?.stock}</span>
                </Typography>
              
                <Button variant="contained" disabled={cartList.find((item) => item.id === product.id)}  onClick={() => addToCartHandler(product)}> {cartList.find((item) => item.id === product.id)  ? <ThumbUpIcon /> :'Add To Cart'} </Button>
                { cartList.find((item) => item.id === product.id) ?
                  
                  <ButtonGroup sx={{paddingLeft:'30px'}}>
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
                   // label="Qty"
                    sx={{width:'50px'}}
                    InputProps={{
                      readOnly: true,
                    }}
                    value={cartList.find((item) => item.id === product.id).qty}
                  />
                    <Button
                      aria-label="increase"
                      onClick={() => {
                        increaseQtyhandler(product.id)
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </Button>
                  </ButtonGroup>:null
                }
            </Grid>
        </Grid>  } 
    </div>
  )
}

