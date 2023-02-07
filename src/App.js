import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { commerce } from "./lib/commerce";
import { Navbar, Products, Cart, Checkout } from "./pages";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  async function fetchProducts() {
    const { data } = await commerce.products.list();

    setProducts(data);
  }

  async function fetchCart() {
    setCart(await commerce.cart.retrieve());
  }

  async function handleAddToCart(productId, quantity) {
    setCart(await commerce.cart.add(productId, quantity));
  }

  async function handleUpdateCartQty(lineItemId, quantity) {
    setCart(await commerce.cart.update(lineItemId, { quantity }));
  }

  async function handleRemoveFromCart(lineItemId) {
    setCart(await commerce.cart.remove(lineItemId));
  }

  async function handleEmptyCart() {
    setCart(await commerce.cart.empty());
  }

  async function refreshCart() {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  }

  async function handleCaptureCheckout(checkoutTokenId, newOrder) {
    try {
      setOrder(await commerce.checkout.capture(checkoutTokenId, newOrder));
      refreshCart();
    } catch (error) {
      setError(error.data.error.message);
    }
  }

  return (
    <>
      <Navbar totalItems={cart.total_items} />
      <Routes>
        <Route
          path="/"
          element={
            <Products
              onAddToCart={handleAddToCart}
              products={products}
              // handleUpdateCartQty
            />
          }
        />
        <Route
          path="cart"
          element={
            <Cart
              cart={cart}
              onUpdateCartQty={handleUpdateCartQty}
              onRemoveFromCart={handleRemoveFromCart}
              onEmptyCart={handleEmptyCart}
            />
          }
        />
        <Route
          path="checkout"
          element={
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={error}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
