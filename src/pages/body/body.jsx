import  { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Box,
  Stack,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import CarouselComponent from "../../component/reuse/corosel/carousel";
import { addToCart, removeFromCart } from "../../redux/cartSlice";
import SearchIcon from "@mui/icons-material/Search";

import "./body.css";

const Body = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.items || []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://dummyjson.com/products");
        const result = await res.json();
        setData(result.products);
        setFilteredData(result.products);
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getCartQuantity = (itemId) => {
    const cartItem = cartItems.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    setToast({
      open: true,
      message: `${item.title} added to cart!`,
      severity: "success",
    });
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item.id));
    setToast({
      open: true,
      message: `${item.title} removed from cart!`,
      severity: "info",
    });
  };

  const handleAddToWishlist = (item) => {
    setToast({
      open: true,
      message: `${item.title} added to wishlist!`,
      severity: "info",
    });
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = data.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
    setStartIndex(0);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredData(filtered);
    }
    setStartIndex(0);
    setSearchQuery("");
  };

  const handleNextProducts = () => {
    setStartIndex((prev) => (prev + 9) % filteredData.length);
  };

  const handleCloseToast = () => setToast({ ...toast, open: false });

  const categories = ["All", "fragrances", "furniture", "groceries", "beauty"];

  if (loading)
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
        <Typography mt={2}>Loading...</Typography>
      </Box>
    );
  if (error)
    return (
      <Box textAlign="center" mt={5}>
        <Typography color="error">{error}</Typography>
      </Box>
    );

  return (
    <Container sx={{ mt: 4 }}>
      <CarouselComponent />

      <Typography variant="h4" textAlign="center" my={4}>
        Explore Products
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <TextField
          label="Search products..."
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          sx={{ width: "80%", maxWidth: 600 }}
          InputProps={{ endAdornment: <SearchIcon /> }}
        />
      </Box>

      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        mb={3}
        flexWrap="wrap"
      >
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "contained" : "outlined"}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat.toUpperCase()}
          </Button>
        ))}
      </Stack>

      {/* Product Grid */}
      <div className="product-grid-container">
        {filteredData.slice(startIndex, startIndex + 9).map((item) => {
          const quantityInCart = getCartQuantity(item.id);

          return (
            <div className="product-card-custom" key={item.id}>
              {/* Wishlist Button */}
              <button
                className="wishlist-button-custom"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToWishlist(item);
                }}
              >
                <svg
                  className="wishlist-icon-custom"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                    2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                    C13.09 3.81 14.76 3 16.5 3 
                    19.58 3 22 5.42 22 8.5
                    c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
              </button>

              {/* Product Image */}
              <div
                className="product-image-wrapper"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="product-image-custom"
                />
              </div>

              {/* Product Content */}
              <div className="product-content-custom">
                <h3 className="product-title-custom">{item.title}</h3>
                <p className="product-description-custom">{item.description}</p>
                <p className="product-price-custom">${item.price}</p>
              </div>

              {/* Add to Cart Button */}
              <div className="card-actions-custom">
                <button
                  className="add-to-cart-button-custom"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(item);
                  }}
                >
                  {quantityInCart > 0
                    ? `${quantityInCart} in Cart`
                    : "Add to Cart"}
                </button>
                <br />
                <button
                  className="remove-to-cart-button-custom"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFromCart(item);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <Box mt={4} textAlign="center">
        <Button variant="outlined" onClick={handleNextProducts}>
          Show Next Products
        </Button>
      </Box>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Body;
