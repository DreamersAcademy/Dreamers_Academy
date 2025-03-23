import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useIsMobile } from "../hooks/use-mobile";
import { toast } from "../components/ui/use-toast";
import { ButtonLoader } from "../components/ui/loader";
import { Button } from "../components/ui/button";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        let newErrors = {};

        if (!name) newErrors.name = "Please enter your name.";
        if (!email) newErrors.email = "Please enter your email.";
        if (!password) newErrors.password = "Please enter your password.";

        if (!mobile) {
            newErrors.mobile = "Please enter your mobile number.";
        } else if (!/^\d{10}$/.test(mobile)) {
            newErrors.mobile = "Mobile number must be exactly 10 digits.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            const result = await axios.post("https://dreamers-academy.onrender.com/signup", { 
                name, 
                email, 
                password, 
                mobile 
            });
            
            console.log(result);
            
            toast({
                title: "Registration successful!",
                description: "Please log in with your new account.",
                duration: 3000,
            });
            
            setTimeout(() => {
                window.location.href = "/Login";
            }, 300);
            
        } catch (err) {
            console.log(err);
            toast({
                title: "Registration failed",
                description: "Please try again later",
                variant: "destructive",
                duration: 3000,
            });
            setIsSubmitting(false);
        }
    };

    const handleLoginClick = (e) => {
        e.preventDefault();
        navigate("/Login");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-100 to-white px-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                    Create Your <span className="text-purple-600">Account</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="text-left">
                        <label className="block font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isSubmitting}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div className="text-left">
                        <label className="block font-medium text-gray-700">Mobile Number</label>
                        <input
                            type="tel"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="Enter your mobile number"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                            disabled={isSubmitting}
                        />
                        {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                    </div>
                    <div className="text-left">
                        <label className="block font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            inputMode="email"
                            placeholder="Enter your email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isSubmitting}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div className="text-left">
                        <label className="block font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isSubmitting}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full p-3 bg-purple-600 text-white font-semibold text-lg rounded-lg hover:bg-purple-700 transition duration-300"
                    >
                        {isSubmitting ? <ButtonLoader /> : 'Sign Up'}
                    </Button>
                </form>

                <p className="text-sm mt-4 text-gray-600">
                    Already have an account?
                    <button 
                        onClick={handleLoginClick}
                        onTouchEnd={isMobile ? handleLoginClick : undefined}
                        className="text-purple-600 font-semibold hover:underline ml-1 appearance-none bg-transparent border-none cursor-pointer"
                    >
                        Log in
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Signup;
