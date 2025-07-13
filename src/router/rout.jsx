import { useState, useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Snackbar, Alert } from "@mui/material";


const Cart = lazy(() => import("../component/reuse/cart/cart"));

const Header = lazy(() => import("../sharemodule/header/navbar"));
const Footer = lazy(() => import("../sharemodule/footer/footer"));
const Register = lazy(() => import("../component/auth/register"));
const Login = lazy(() => import("../component/auth/login"));
const Body = lazy(() => import("../pages/body/body"));
const Whyus = lazy(() => import("../pages/whyus/whyus"));

const Blog = lazy(() => import("../pages/blog/blog"));

const Contact = lazy(() => import("../pages/Contact/contact"));
const ProductDetails = lazy(() =>
  import("../component/reuse/productdetail/productDetails")
);

export default function Rout() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleToastClose = () => setToast({ ...toast, open: false });

  const publicRoutes = [
    { path: "/", element: <Body setToast={setToast} /> },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login setIsLoggedIn={setIsLoggedIn} /> },
  ];

  const privateRoutes = [
    { path: "/whyus", element: <Whyus /> },
    { path: "/blog", element: <Blog /> },
    { path: "/contact", element: <Contact /> },
    { path: "/product/:id", element: <ProductDetails /> },
    { path: "/cart", element: <Cart /> },
  ];

  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" replace />;
  };

  return (

      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Header setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            {/* Public Routes */}
            {publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}

            {/* Private Routes */}
            {privateRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<PrivateRoute>{route.element}</PrivateRoute>}
              />
            ))}

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />

          <Snackbar
            open={toast.open}
            autoHideDuration={3000}
            onClose={handleToastClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              severity={toast.severity}
              onClose={handleToastClose}
              sx={{ width: "100%" }}
            >
              {toast.message}
            </Alert>
          </Snackbar>
        </Suspense>
      </Router>
   
  );
}
