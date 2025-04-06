import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { 
  ArrowLeft,
  Calendar,
  User,
  Mail,
  Phone,
  BookOpen,
  Check,
  AlertCircle
} from "lucide-react";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../hooks/use-toast";

const BookSeat = () => {
  const { courseTitle } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [course, setCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredBatch: "",
    additionalInfo: ""
  });

  // Form validation state
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    preferredBatch: ""
  });

  // Pattern for email validation
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  // Pattern for phone validation - accepts various formats with optional country code
  const phonePattern = /^(\+\d{1,3}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

  useEffect(() => {
    // In a real app, you'd fetch the course data based on the courseTitle
    // For now, we'll just set some dummy data
    const courseData = {
      title: courseTitle || "Course",
      level: "Intermediate",
      duration: "3 months",
      studentsEnrolled: 120,
      description: "This comprehensive course is designed to help you master the language skills needed for your goals.",
      batches: ["Morning (9AM-11AM)", "Afternoon (2PM-4PM)", "Evening (6PM-8PM)"]
    };
    setCourse(courseData);
    
    // Check if user is logged in
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      navigate("/Login");
    } else {
      // Pre-fill email with logged in user's email
      const user = JSON.parse(loggedInUser);
      setFormData(prev => ({
        ...prev,
        email: user.email
      }));
    }
  }, [courseTitle, navigate]);
  const [paymentImage, setPaymentImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPaymentImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validateField = (name, value) => {
    let errorMessage = "";
    
    switch (name) {
      case "name":
        if (!value.trim()) {
          errorMessage = "Full name is required";
        }
        break;
      case "email":
        if (!value.trim()) {
          errorMessage = "Email address is required";
        } else if (!emailPattern.test(value)) {
          errorMessage = "Please enter a valid email address";
        }
        break;
      case "phone":
        if (!value.trim()) {
          errorMessage = "Phone number is required";
        } else if (!phonePattern.test(value)) {
          errorMessage = "Please enter a valid phone number";
        }
        break;
      case "preferredBatch":
        if (!value) {
          errorMessage = "Please select a preferred batch";
        }
        break;
      default:
        break;
    }

    return errorMessage;
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate each required field
    Object.keys(formData).forEach(key => {
      if (key !== "additionalInfo") { // Skip validation for additionalInfo
        const error = validateField(key, formData[key]);
        newErrors[key] = error;
        if (error) {
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user types
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({
      ...prev,
      preferredBatch: value
    }));

    // Clear error when user selects
    setErrors(prev => ({
      ...prev,
      preferredBatch: ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate all fields before submission
    if (!validateForm()) {
      toast({
        title: "Form Validation Error",
        description: "Please check the form for errors and try again.",
        variant: "destructive"
      });
      return;
    }
  
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "Please log in first!",
        variant: "destructive"
      });
      navigate("/Login");
      return;
    }
  
    toast({
      title: "Processing",
      description: "Uploading your payment screenshot...",
    });
  
    try {
      let imageUrl = "";
  
      // 🌩️ Upload image to Cloudinary if paymentImage is present
      if (paymentImage) {
        const imgFormData = new FormData();
        imgFormData.append("file", paymentImage);
        imgFormData.append("upload_preset", "dreamers_booking"); // replace
        imgFormData.append("cloud_name", "ddunj6cag"); // replace
  
        const cloudinaryRes = await axios.post(
          "https://api.cloudinary.com/v1_1/ddunj6cag/image/upload", // replace
          imgFormData
        );
  
        imageUrl = cloudinaryRes.data.secure_url;
      }
  
      // 📦 Prepare full booking data with image URL
      const bookingData = {
        name: formData.name,
        email: user.email,
        phone: formData.phone,
        courseTitle,
        preferredBatch: formData.preferredBatch,
        additionalInfo: formData.additionalInfo || "",
        paymentImage: imageUrl,
      };
  
      console.log("📢 Sending Booking Data:", bookingData);
  
      toast({
        title: "Processing",
        description: "Submitting your registration...",
      });
  
      const res = await axios.post(
        "https://dreamers-academy.onrender.com/book-seat",
        bookingData
      );
  
      console.log("✅ Booking Success:", res.data);
  
      toast({
        title: "Success!",
        description: "Your seat has been booked successfully.",
        variant: "success"
      });
  
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      console.error("🚨 Error:", err.message);
      toast({
        title: "Booking Failed",
        description: err.response?.data?.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center gap-2 text-gray-600 dark:text-black hover:text-gray-900 dark:hover:text-black"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4 text-black" />
          Back to Dashboard
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Book a Seat</CardTitle>
                <CardDescription>
                  Complete the form below to register for {courseTitle}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="flex items-center justify-between">
                        Full Name
                        {errors.name && (
                          <span className="text-xs text-red-500 flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.name}
                          </span>
                        )}
                      </Label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input 
                          id="name" 
                          name="name"
                          placeholder="Your full name" 
                          className={`pl-10 ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`} 
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="flex items-center justify-between">
                        Email Address
                        {errors.email && (
                          <span className="text-xs text-red-500 flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.email}
                          </span>
                        )}
                      </Label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input 
                          id="email" 
                          name="email"
                          type="text" 
                          placeholder="your.email@example.com" 
                          className={`pl-10 ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                          value={formData.email}
                          onChange={handleChange}
                          readOnly={formData.email !== ""}
                        />
                        {!errors.email && formData.email && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <Check className="h-5 w-5 text-green-500" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="flex items-center justify-between">
                        Phone Number
                        {errors.phone && (
                          <span className="text-xs text-red-500 flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.phone}
                          </span>
                        )}
                      </Label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input 
                          id="phone" 
                          name="phone"
                          placeholder="+91 98765 43210" 
                          className={`pl-10 ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                          value={formData.phone}
                          onChange={handleChange}
                        />
                        {!errors.phone && formData.phone && phonePattern.test(formData.phone) && (
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <Check className="h-5 w-5 text-green-500" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="batch" className="flex items-center justify-between">
                        Preferred Batch
                        {errors.preferredBatch && (
                          <span className="text-xs text-red-500 flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            {errors.preferredBatch}
                          </span>
                        )}
                      </Label>
                      <Select 
                        onValueChange={handleSelectChange} 
                        value={formData.preferredBatch}
                      >
                        <SelectTrigger 
                          className={`w-full mt-1 ${errors.preferredBatch ? 'border-red-500 focus:ring-red-500' : ''}`}
                        >
                          <SelectValue placeholder="Select preferred timing" />
                        </SelectTrigger>
                        <SelectContent>
                          {course?.batches.map((batch, index) => (
                            <SelectItem key={index} value={batch}>
                              {batch}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                      <Textarea 
                        id="additionalInfo" 
                        name="additionalInfo"
                        placeholder="Any specific requirements or questions?" 
                        className="mt-1" 
                        rows={4}
                        value={formData.additionalInfo}
                        onChange={handleChange}
                      />
                    </div>
                    
                  </div>
                  <div>
  <Label htmlFor="paymentImage">Upload Payment Screenshot</Label>
  <Input 
    id="paymentImage" 
    type="file" 
    accept="image/*" 
    className="mt-1"
    onChange={handleImageChange}
  />
  {preview && (
    <div className="mt-3">
      <p className="text-sm text-gray-500">Preview:</p>
      <img 
        src={preview} 
        alt="Payment Preview" 
        className="mt-2 max-h-60 rounded-md border border-gray-300 shadow-md" 
      />
    </div>
  )}
</div>

                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Complete Registration
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Course Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <BookOpen className="h-5 w-5 text-purple-500 dark:text-black" />
                  </div>
                  <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-black border-purple-200 dark:border-purple-800">
                    {course?.level}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 dark:text-black">
                  {course?.title}
                </h3>
                
                <p className="text-gray-600 dark:text-black">
                  {course?.description}
                </p>
                
                <div className="pt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-black">Duration:</span>
                    <span className="text-sm font-medium">{course?.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-black">Students:</span>
                    <span className="text-sm font-medium">{course?.studentsEnrolled}+ enrolled</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500 dark:text-black">Start Date:</span>
                    <span className="text-sm font-medium">Next batch: July 15, 2025</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-purple-50 dark:bg-purple-900/20 flex justify-center py-4">
                <div className="flex items-center text-purple-600 dark:text-black">
                  <Calendar className="h-5 w-5 mr-2 text-black" />
                  <span className="text-sm font-medium">Classes 3 times a week</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSeat;