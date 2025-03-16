import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/Login", { email, password });

            if (response.data.message === "Success") {
                localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user details
                navigate("/Dashboard");
            } else {
                alert(response.data.message); // Show error message
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-100 to-white px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Welcome Back to <span className="text-purple-600">Dreamers Academy</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Input */}
                    <div className="text-left">
                        <label className="block font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password Input */}
                    <div className="text-left">
                        <label className="block font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full p-3 bg-purple-600 text-white font-semibold text-lg rounded-lg hover:bg-purple-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>

                {/* Forgot Password */}
                <p className="text-sm mt-4 text-gray-600 cursor-pointer hover:underline">
                    Forgot Password?
                </p>

                {/* Register Link */}
                <p className="text-sm mt-2 text-gray-600">
                    Don't have an account?
                    <Link to="/Signup" className="text-purple-600 font-semibold hover:underline ml-1">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
