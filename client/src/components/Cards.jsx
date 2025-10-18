import React, {useContext} from "react";
import "./card.css";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartProvider";


const Cards = ({ Products }) => {

  console.log(Products)

  const navigate = useNavigate()

  const {addToCart} = useContext(CartContext);

  const handleAddToCart = (item) => {
    addToCart(item); // Add the sample item to the cart
    alert(`${item?.name} added to cart!`); // Notify user
    
  };


  return (
    <div className="main-container">
      <div className="heading">
        <h3>Products we offer</h3>
      </div>

      <div className="card-grid">
        {Products && Products.length > 0 ? (
          Products.map((product) => (
            <div key={product?._id} className="card-container">
              <img src={product?.image} alt={product?.name} className="card-img" />
              <h1>{product?.name} </h1>
              <p>{product?.description}</p>
              <div className="icons">

                <button onClick={()=>{
                  navigate(`/model-viewer/${product?._id}`)
                }}>
                  View
                </button>

                <FaHeart
                  className="icon1"
                  size={30}
                  style={{ marginRight: "10px" }}
                />
                <FaShoppingCart 
                className="icon2" 
                size={30} 
                onClick={(e)=>{
                  e.preventDefault()
                  handleAddToCart(product)
                }}
                />
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};
export default Cards;
