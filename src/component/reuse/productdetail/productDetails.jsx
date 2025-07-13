// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import {
//   Container, Typography, Box, CircularProgress, Card, CardMedia, CardContent, Button,
// } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../../redux/cartSlice';

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     fetch(`https://dummyjson.com/products/${id}`)
//       .then((res) => res.json())
//       .then((data) => setProduct(data));
//   }, [id]);

//   if (!product) {
//     return (
//       <Box textAlign="center" mt={4}>
//         <CircularProgress />
//         <Typography mt={2}>Loading product...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Container sx={{ mt: 4 }}>
//       <Card>
//         <CardMedia
//           component="img"
//           height="400"
//           image={product.thumbnail}
//           alt={product.title}
//         />
//         <CardContent>
//           <Typography variant="h4" gutterBottom>
//             {product.title}
//           </Typography>
//           <Typography variant="body1" paragraph>
//             {product.description}
//           </Typography>
//           <Typography variant="h6" color="text.secondary">
//             Price: ${product.price}
//           </Typography>
//           <Button
//             variant="contained"
//             sx={{ mt: 2 }}
//             onClick={() => dispatch(addToCart(product))}
//           >
//             Add to Cart
//           </Button>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default ProductDetails;



// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Container, Typography, Box, CircularProgress, Button, Grid,
//   Card, CardMedia, Rating, Chip, Divider, IconButton,
//   useMediaQuery, useTheme
// } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '../../redux/cartSlice';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [mainImage, setMainImage] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
//   // Get cart items from Redux store
//   const cart = useSelector(state => state.cart);
//   const cartItems = cart?.items || [];
  
//   // Find current product in cart
//   const cartItem = cartItems.find(item => item.id === parseInt(id));

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`https://dummyjson.com/products/${id}`);
//         if (!response.ok) throw new Error('Product not found');
//         const data = await response.json();
//         setProduct(data);
//         setMainImage(data.thumbnail);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };
    
//     fetchProduct();
//   }, [id]);

//   const handleAddToCart = () => {
//     dispatch(addToCart({...product, quantity}));
//     setQuantity(1);
//   };

//   const handleIncrement = () => {
//     setQuantity(prev => prev + 1);
//   };

//   const handleDecrement = () => {
//     if (quantity > 1) {
//       setQuantity(prev => prev - 1);
//     }
//   };

//   if (loading) {
//     return (
//       <Box textAlign="center" mt={4} sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//         <CircularProgress size={60} />
//         <Typography mt={2} variant="h6">Loading product details...</Typography>
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box textAlign="center" mt={4} sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//         <Typography variant="h5" color="error" gutterBottom>
//           Error Loading Product
//         </Typography>
//         <Typography variant="body1" gutterBottom>{error}</Typography>
//         <Button 
//           variant="contained" 
//           color="primary" 
//           startIcon={<ArrowBackIcon />}
//           onClick={() => navigate('/')}
//           sx={{ mt: 2 }}
//         >
//           Back to Home
//         </Button>
//       </Box>
//     );
//   }

//   if (!product) return null;

//   return (
//     <Container maxWidth="lg" sx={{ py: 4, mt: 2, mb: 6 }}>
//       <Button 
//         startIcon={<ArrowBackIcon />} 
//         onClick={() => navigate(-1)}
//         sx={{ mb: 2 }}
//       >
//         Back
//       </Button>
      
//       <Grid container spacing={4}>
//         {/* Product Images */}
//         <Grid item xs={12} md={6}>
//           <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
//             <CardMedia
//               component="img"
//               image={mainImage}
//               alt={product.title}
//               sx={{ 
//                 height: isMobile ? 300 : 400, 
//                 objectFit: 'contain',
//                 backgroundColor: '#f5f5f5',
//                 p: 2
//               }}
//             />
            
//             {/* Thumbnail Gallery */}
//             <Box sx={{ 
//               display: 'flex', 
//               overflowX: 'auto', 
//               gap: 1, 
//               p: 2,
//               borderTop: '1px solid #eee'
//             }}>
//               {product.images && product.images.map((img, index) => (
//                 <Box 
//                   key={index}
//                   onClick={() => setMainImage(img)}
//                   sx={{
//                     cursor: 'pointer',
//                     border: mainImage === img ? '2px solid' : '1px solid #ddd',
//                     borderColor: mainImage === img ? 'primary.main' : 'divider',
//                     borderRadius: 1,
//                     overflow: 'hidden',
//                     flexShrink: 0
//                   }}
//                 >
//                   <CardMedia
//                     component="img"
//                     image={img}
//                     alt={`Thumbnail ${index + 1}`}
//                     sx={{ 
//                       width: 80, 
//                       height: 80, 
//                       objectFit: 'cover',
//                       opacity: mainImage === img ? 1 : 0.7,
//                       '&:hover': {
//                         opacity: 1
//                       }
//                     }}
//                   />
//                 </Box>
//               ))}
//             </Box>
//           </Card>
//         </Grid>
        
//         {/* Product Details */}
//         <Grid item xs={12} md={6}>
//           <Box sx={{ mb: 2 }}>
//             <Chip 
//               label={product.brand} 
//               size="small" 
//               color="secondary"
//               sx={{ mb: 1 }}
//             />
//             <Typography variant="h4" component="h1" gutterBottom>
//               {product.title}
//             </Typography>
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Rating 
//                 name="product-rating" 
//                 value={product.rating} 
//                 precision={0.1} 
//                 readOnly 
//                 sx={{ mr: 1 }}
//               />
//               <Typography variant="body2" color="text.secondary">
//                 ({product.rating} • {product.reviews || 124} reviews)
//               </Typography>
//             </Box>
            
//             <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>
//               ${product.price}
//               {product.discountPercentage && (
//                 <Typography 
//                   component="span" 
//                   variant="body1" 
//                   color="text.secondary"
//                   sx={{ textDecoration: 'line-through', ml: 1 }}
//                 >
//                   ${(product.price / (1 - product.discountPercentage/100)).toFixed(2)}
//                 </Typography>
//               )}
//               {product.discountPercentage && (
//                 <Chip 
//                   label={`${product.discountPercentage}% OFF`} 
//                   color="error" 
//                   size="small"
//                   sx={{ ml: 1, fontWeight: 'bold' }}
//                 />
//               )}
//             </Typography>
            
//             <Typography variant="body1" paragraph sx={{ mb: 3 }}>
//               {product.description}
//             </Typography>
            
//             <Divider sx={{ my: 3 }} />
            
//             {/* Stock Information */}
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Typography variant="body1" sx={{ mr: 2, fontWeight: 'medium' }}>
//                 Availability:
//               </Typography>
//               <Typography 
//                 variant="body1" 
//                 color={product.stock > 0 ? 'success.main' : 'error'}
//               >
//                 {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
//               </Typography>
//             </Box>
            
//             {/* Category */}
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Typography variant="body1" sx={{ mr: 2, fontWeight: 'medium' }}>
//                 Category:
//               </Typography>
//               <Chip 
//                 label={product.category} 
//                 size="small" 
//                 sx={{ textTransform: 'capitalize' }}
//               />
//             </Box>
            
//             {/* Quantity Selector */}
//             <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
//               <Typography variant="body1" sx={{ mr: 2, fontWeight: 'medium' }}>
//                 Quantity:
//               </Typography>
//               <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 1 }}>
//                 <IconButton 
//                   onClick={handleDecrement}
//                   disabled={quantity <= 1}
//                   size="small"
//                   sx={{ p: 1 }}
//                 >
//                   <RemoveIcon fontSize="small" />
//                 </IconButton>
//                 <Typography variant="body1" sx={{ px: 2 }}>
//                   {quantity}
//                 </Typography>
//                 <IconButton 
//                   onClick={handleIncrement}
//                   size="small"
//                   sx={{ p: 1 }}
//                 >
//                   <AddIcon fontSize="small" />
//                 </IconButton>
//               </Box>
//             </Box>
            
//             {/* Action Buttons */}
//             <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 startIcon={cartItem ? <ShoppingCartIcon /> : null}
//                 onClick={handleAddToCart}
//                 disabled={product.stock <= 0}
//                 sx={{ 
//                   px: 4, 
//                   py: 1.5, 
//                   borderRadius: 1,
//                   flexGrow: isMobile ? 1 : 0
//                 }}
//               >
//                 {cartItem ? `Add ${quantity} More` : 'Add to Cart'}
//               </Button>
              
//               <Button
//                 variant="outlined"
//                 color="secondary"
//                 startIcon={<FavoriteBorderIcon />}
//                 sx={{ 
//                   px: 4, 
//                   py: 1.5, 
//                   borderRadius: 1,
//                   flexGrow: isMobile ? 1 : 0
//                 }}
//               >
//                 Wishlist
//               </Button>
//             </Box>
            
//             {/* Shipping Info */}
//             <Box sx={{ 
//               backgroundColor: '#f9f9f9', 
//               borderRadius: 2, 
//               p: 2, 
//               border: '1px solid #eee',
//               mb: 3
//             }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                 <LocalShippingIcon color="primary" sx={{ mr: 1 }} />
//                 <Typography variant="body1" fontWeight="medium">
//                   Free Shipping & Returns
//                 </Typography>
//               </Box>
//               <Typography variant="body2" color="text.secondary">
//                 Free standard shipping for orders over $50. 30-day return policy.
//               </Typography>
//             </Box>
            
//             {/* Security Info */}
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <VerifiedUserIcon color="success" sx={{ mr: 1 }} />
//               <Typography variant="body2" color="text.secondary">
//                 Secure checkout guaranteed
//               </Typography>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
      
//       {/* Additional Details */}
//       <Box sx={{ mt: 6, backgroundColor: '#f9f9f9', p: 3, borderRadius: 2 }}>
//         <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
//           Product Specifications
//         </Typography>
        
//         <Grid container spacing={2} sx={{ mt: 1 }}>
//           <Grid item xs={12} md={6}>
//             <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
//               Brand
//             </Typography>
//             <Typography variant="body1" sx={{ mb: 2 }}>
//               {product.brand}
//             </Typography>
            
//             <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
//               Category
//             </Typography>
//             <Typography variant="body1" sx={{ mb: 2 }}>
//               {product.category}
//             </Typography>
            
//             <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
//               Dimensions
//             </Typography>
//             <Typography variant="body1" sx={{ mb: 2 }}>
//               {product.dimensions || 'N/A'}
//             </Typography>
//           </Grid>
          
//           <Grid item xs={12} md={6}>
//             <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
//               Weight
//             </Typography>
//             <Typography variant="body1" sx={{ mb: 2 }}>
//               {product.weight || 'N/A'}
//             </Typography>
            
//             <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
//               Warranty
//             </Typography>
//             <Typography variant="body1" sx={{ mb: 2 }}>
//               {product.warranty || '1 year manufacturer warranty'}
//             </Typography>
            
//             <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
//               SKU
//             </Typography>
//             <Typography variant="body1">
//               {product.id}-{product.brand.substring(0, 3).toUpperCase()}
//             </Typography>
//           </Grid>
//         </Grid>
//       </Box>
//     </Container>
//   );
// };

// export default ProductDetails;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, CircularProgress, Button, Grid,
  Card, CardMedia, Rating,IconButton,
  useMediaQuery, useTheme, Paper
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../redux/cartSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const cartItems = useSelector(state => state.cart?.items || []);
  const cartItem = cartItems.find(item => item.id === parseInt(id));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();

        // Add mock reviews for demonstration
        data.reviews = [
          {
            rating: 4,
            comment: 'Good product. Works as expected!',
            date: '2024-06-01',
            reviewerName: 'Alice Kumar',
            reviewerEmail: 'alice@example.com'
          },
          {
            rating: 5,
            comment: 'Amazing quality and fast shipping.',
            date: '2024-06-12',
            reviewerName: 'Rahul Singh',
            reviewerEmail: 'rahul@example.com'
          }
        ];

        setProduct(data);
        setMainImage(data.thumbnail);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    setQuantity(1);
  };

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => quantity > 1 && setQuantity(prev => prev - 1);

  if (loading) {
    return (
      <Box textAlign="center" mt={4} sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <CircularProgress size={60} />
        <Typography mt={2} variant="h6">Loading product details...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4} sx={{ minHeight: '60vh' }}>
        <Typography variant="h5" color="error">{error}</Typography>
        <Button variant="contained" startIcon={<ArrowBackIcon />} sx={{ mt: 2 }} onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Box>
    );
  }

  if (!product) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>

      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardMedia
              component="img"
              image={mainImage}
              alt={product.title}
              sx={{ height: isMobile ? 300 : 400, objectFit: 'contain', backgroundColor: '#f5f5f5', p: 2 }}
            />
            <Box sx={{ display: 'flex', overflowX: 'auto', gap: 1, p: 2 }}>
              {product.images && product.images.map((img, index) => (
                <CardMedia
                  key={index}
                  component="img"
                  image={img}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setMainImage(img)}
                  sx={{
                    width: 80,
                    height: 80,
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: mainImage === img ? '2px solid #1976d2' : '1px solid #ccc',
                    opacity: mainImage === img ? 1 : 0.6
                  }}
                />
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>{product.title}</Typography>
          <Rating value={product.rating} precision={0.1} readOnly />
          <Typography variant="h6" color="primary" sx={{ my: 2 }}>${product.price}</Typography>
          <Typography variant="body1" paragraph>{product.description}</Typography>

          {/* Quantity Controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton onClick={handleDecrement} disabled={quantity <= 1}><RemoveIcon /></IconButton>
            <Typography sx={{ mx: 2 }}>{quantity}</Typography>
            <IconButton onClick={handleIncrement}><AddIcon /></IconButton>
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            startIcon={<ShoppingCartIcon />}
            disabled={product.stock <= 0}
            sx={{ mr: 2 }}
          >
            {cartItem ? `Add ${quantity} More` : 'Add to Cart'}
          </Button>

          <Button variant="outlined" startIcon={<FavoriteBorderIcon />}>Wishlist</Button>
        </Grid>
      </Grid>

      {/* Reviews Section */}
      <Box mt={6}>
        <Typography variant="h5" gutterBottom>Customer Reviews</Typography>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2 }} elevation={2}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography fontWeight="bold">{review.reviewerName}</Typography>
                <Rating value={review.rating} precision={0.5} readOnly />
              </Box>
              <Typography variant="body2" color="text.secondary">{review.date}</Typography>
              <Typography mt={1}>{review.comment}</Typography>
            </Paper>
          ))
        ) : (
          <Typography>No reviews available for this product.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default ProductDetails;
