import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { CartContext } from "./CartProvider"; // Import CartContext

const Navbar = () => {
  const navigate = useNavigate();
  const { addToCart, cartItems } = useContext(CartContext); // Access cart and add to cart function

  const token = sessionStorage.getItem('token');

  const handleSignOut = () => {
    sessionStorage.removeItem('token');
    window.location.reload()
  };

  // Sample item to add to the cart
  const sampleItem = {
    id: 1,
    name: "Sample Furniture Item",
    price: 100,
  };

  const handleAddToCart = () => {
    addToCart(sampleItem); // Add the sample item to the cart
    alert("Item added to cart!"); // Notify user
  };

  return (
    <div className="Navbar-container">
      {/* First Row: Logo and Sign-In/Sign-Up */}
      <div className="navbar-top">
        <div className="logo">
          <h3>FURNITURE</h3>
        </div>

        <div className="auth-buttons">
          {token ? (
            <button className="logout-btn" onClick={handleSignOut}>
              Sign Out
            </button>
          ) : (
            <>
              <button
                className="login-btn"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
              <button
                className="signup-btn"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>

      {/* Second Row: Navbar Links and Icons */}
      <div className="navbar-bottom">
        <ul className="navbar">
          <li>
            <a id="active" href=" ">
              Home
            </a>
          </li>
          <li>
            <a href="#card">About</a>
          </li>
          <li>
            <a href="#footer">Contact</a>
          </li>
        </ul>

        <div className="icons">
          <FaHeart size={20} style={{ marginRight: "10px" }} />
          <FaShoppingCart
            className="icon2"
            size={30}
            onClick={() => navigate('/cart')} // Navigate to Cart page
          />
          <span>{cartItems.length}</span> {/* Display the number of items in the cart */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
