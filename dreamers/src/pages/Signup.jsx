import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        let newErrors = {};

        if (!name) newErrors.name = "Please enter your name.";
        if (!email) newErrors.email = "Please enter your email.";
        if (!password) newErrors.password = "Please enter your password.";

        // Mobile number validation (must be 10 digits)
        if (!mobile) {
            newErrors.mobile = "Please enter your mobile number.";
        } else if (!/^\d{10}$/.test(mobile)) {
            newErrors.mobile = "Mobile number must be exactly 10 digits.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        axios.post("https://dreamers-academy.onrender.com/register", { name, email, password, mobile })
            .then((result) => {
                console.log(result);
                alert("Registration successful! Please log in.");
                navigate("/Login");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-100 to-white px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Create Your <span className="text-purple-600">Account</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Input */}
                    <div className="text-left">
                        <label className="block font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Mobile Number Input */}
                    <div className="text-left">
                        <label className="block font-medium text-gray-700">Mobile Number</label>
                        <input
                            type="text"
                            placeholder="Enter your mobile number"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        />
                        {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                    </div>

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
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* Password Input */}
                    <div className="text-left">
                        <label className="block font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full p-3 bg-purple-600 text-white font-semibold text-lg rounded-lg hover:bg-purple-700 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Already have an account */}
                <p className="text-sm mt-4 text-gray-600">
                    Already have an account?
                    <Link to="/Login" className="text-purple-600 font-semibold hover:underline ml-1">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
