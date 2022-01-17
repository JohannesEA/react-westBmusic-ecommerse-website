//Functions
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Components
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import ProductPage from "./pages/product/Product";
import GlobalStyles from "./style/globalStyles";
import Footer from "./components/footer/Footer";
import Drawer from "@material-ui/core/Drawer";
import Cart from "./components/cart/Cart";
import Badge from "@material-ui/core/Badge";
import Confirm from "./pages/confirm/Confirm";
import Error from "./pages/error/Error";
import LoadingPage from "./components/loading/LoadingPage";

//Styles
import { CartButton, DeleteButton } from "./style/buttons";
import { BsCart } from "react-icons/bs";
import Login from "./pages/login/Login";
import AdminHome from "./pages/admin/AdminHome";

//Types
import { Product } from "./models/Product";

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as Product[]);
  const [isLoading, setIsLoading] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated")
  );

  const getTotalItems = () => cartItems.length;

  const handleRemoveFromCart = (item: Product) => {
    var index = cartItems.indexOf(item);
    if (index !== -1) {
      alert(`Produktet ${item.title} er fjernet fra handlekurven`);
      cartItems.splice(index, 1);
      setCartItems(cartItems);
    }
  };

  const handleAddToCart = (clickedItem: Product) => {
    setCartItems((prev) => {
      //1. Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item._id === clickedItem._id);
      if (isItemInCart) {
        alert("Product er allerede i handlekurven..");
        return prev.map((item) =>
          item._id === clickedItem._id ? { ...item } : item
        );
      }
      //2. First time the item is added
      alert(`Produktet ${clickedItem.title} er lagt til i handlekurven.`);

      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  // useEffect(() => {
  //   const set = () => {
  //     setIsAuthenticated(localStorage.getItem("isAuthenticated"));
  //   };
  //   set();
  // }, [isAuthenticated]);

  // useEffect(() => {
  //   setTimeout(() => setIsLoading(false), 1500);
  // }, []);

  // useEffect(() => {
  //   let timer1 = setTimeout(
  //     () => localStorage.setItem("isAuthenticated", "false"),
  //     1800000
  //   );

  //   clearTimeout(timer1);
  // }, []);

  if (isLoading) return <LoadingPage />;

  return (
    <Router>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <DeleteButton onClick={() => setCartOpen(false)}>X</DeleteButton>
        <Cart cartItems={cartItems} removeFromCart={handleRemoveFromCart} />
      </Drawer>

      <CartButton className="kc_fab_main_btn" onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems()} color="error">
          <BsCart fontSize="20px" />
        </Badge>
      </CartButton>
      <GlobalStyles />

      <Routes>
        <Route path="/" element={<Home addToCart={handleAddToCart} />} />
        <Route
          path="/products"
          element={<Products addToCart={handleAddToCart} />}
        />
        <Route
          path="/products/:id"
          element={<ProductPage addToCart={handleAddToCart} />}
        />
        <Route path="/confirm" element={<Confirm />} />
        <Route
          path="/login"
          element={isAuthenticated === "false" ? <Login /> : <AdminHome />}
        />
        <Route
          path="/admin"
          element={isAuthenticated === "true" ? <AdminHome /> : <Login />}
        />

        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
