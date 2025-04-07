// src/pages/PaymentPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button"; // adjust to your Button path
import axios from "axios";

const payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (location.state?.amount) {
      setAmount(location.state.amount);
    } else {
      navigate("/dashboard"); // fallback if no amount found
    }
  }, [location, navigate]);

  const handlePaymentSuccess = async () => {
    try {
      await axios.post("/api/payment", {
        amount,
        status: "Success",
        method: "Online",
        timestamp: new Date(),
      });
      alert("Payment successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Payment storing failed", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Confirm Your Payment
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          You are about to pay <span className="font-semibold">₹{amount}</span> for your booked courses.
        </p>
        <Button 
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-lg"
          onClick={handlePaymentSuccess}
        >
          Pay Now
        </Button>
      </div>
    </div>
  );
};

export default payment;
