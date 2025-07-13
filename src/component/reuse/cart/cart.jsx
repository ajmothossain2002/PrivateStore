
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
 
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../../redux/cartSlice'; // ensure this is defined

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6">Your cart is empty.</Typography>
      ) : (
        <Grid container spacing={3}>
          {cartItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.thumbnail}
                  alt={item.title}
                  sx={{ objectFit: 'contain', backgroundColor: '#f5f5f5' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" noWrap>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {item.description}
                  </Typography>
                  <Typography mt={1}>
                    Quantity: <strong>{item.quantity}</strong>
                  </Typography>
                  <Typography>
                    Price: <strong>${item.price}</strong>
                  </Typography>
                  <Typography mt={1} color="primary">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </CardContent>
                <Box sx={{ textAlign: 'right', px: 2, pb: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {cartItems.length > 0 && (
        <Box mt={4} textAlign="right">
          <Typography variant="h5">
            Total: <strong>${total.toFixed(2)}</strong>
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Cart;
