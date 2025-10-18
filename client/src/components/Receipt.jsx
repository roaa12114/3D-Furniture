import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Receipt.css"; // Optional: Add your own CSS styling

const PurchaseReceipt = () => {
  const params = useParams(); // Get purchaseId from URL
  const [purchase, setPurchase] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const purchaseId = params.id;

  // Fetch purchase data by ID
  useEffect(() => {
    const fetchPurchase = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/purchase/get-purchase-by-id/${purchaseId}`); // Adjust URL based on your backend route
        console.log(response.data)
        setPurchase(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch purchase details");
        setLoading(false);
      }
    };
    fetchPurchase();
  }, [purchaseId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  
  return (
    <div className="receipt-container">
      <h2>Purchase Receipt</h2>
      <p><strong>Purchase ID:</strong> {purchase?._id}</p>
      <p><strong>User ID:</strong> {purchase?.userId}</p>
      <p><strong>Date:</strong> {new Date(purchase?.createdAt).toLocaleString()}</p>

      <table className="receipt-table">
        <thead>
          <tr>
            <th>Furniture ID</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {purchase && purchase?.items.map((item, index) => (
            <tr key={index}>
              <td>{item?.furnitureId}</td>
              <td>{item?.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p><strong>Total Amount Paid:</strong> ${purchase.amount_paid.toFixed(2)}</p>
      <button onClick={()=>{window.location.replace('/')}}>
        Home
      </button>
    </div>
  );
};

export default PurchaseReceipt;
