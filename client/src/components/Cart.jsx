import React, { useContext } from "react";
import { CartContext } from "./CartProvider"; // Import the CartContext
import "./Cart.css"; // Custom styling for the cart
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";

const Cart = () => {
  const navigate = useNavigate()

  const { cartItems, removeFromCart, updateCartQuantity, clearCart } = useContext(CartContext); // Access cart state and functions

  // Calculate the total price of items in the cart
  const totalPrice = cartItems.reduce((acc, item) => acc + item?.price * item?.quantity, 0);

  const handlePurchase = async  () =>{

    if(!sessionStorage.getItem("token")){
        alert("You Need to Login First")
        navigate('/login')
        
    }else{
        const purchaseBody = 
        {
        "userId": sessionStorage.getItem("userId"),
        "items":cartItems.map((item)=> {return {
            "furnitureId":item._id,
            "quantity": item.quantity
        }}),
        "amount_to_pay":totalPrice
        }
        
const res = await axios.post(`${API_BASE_URL}/purchase/make-purchase`, purchaseBody);
        const data = await res.data;
        if(data){
            clearCart()
        }
        navigate(`/receipt/${data._id}`)

        console.log(data)
    }

    
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems && cartItems.map((item) => (
                <tr key={item?._id}>
                  <td>{item?.name}</td>
                  <td>${item?.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item?.quantity}
                      onChange={(e) => updateCartQuantity(item?._id, Number(e.target.value))}
                    />
                  </td>
                  <td>${(item?.price * item?.quantity).toFixed(2)}</td>
                  <td>
                    <button onClick={() => removeFromCart(item?._id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        
          <div className="cart-total">
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
          </div>
          <div>
          <button onClick={handlePurchase}>Pay</button>
        </div>

        </div>
      )}
    </div>
  );
};

export default Cart;
