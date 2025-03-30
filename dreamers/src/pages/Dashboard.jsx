import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
    LogOut, 
    BookOpen, 
    Target, 
    Award,
    GraduationCap,
    Briefcase,
    LineChart,
    Calendar,
    User,
    DollarSign,
    Users,
    Clock,
    CheckCircle,
    LayoutDashboard,
    Medal,
    Menu,
    X,
    ChevronRight
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useIsMobile } from "../hooks/use-mobile";
import { useToast } from "../hooks/use-toast";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const isMobile = useIsMobile();
    const [activeSection, setActiveSection] = useState("home");
    const [showAllCourses, setShowAllCourses] = useState(false);
    const [bookings, setBookings] = useState([]);
    const { toast } = useToast();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const parsedUser = JSON.parse(loggedInUser);
            setUser(parsedUser);
            
            // Fetch user bookings if there's a user
            fetchUserBookings(parsedUser.email);
        } else {
            // For demo purposes, we'll still show the dashboard
            // In a real app, you might want to redirect to login
            console.log("No user found in localStorage");
        }
    }, [navigate]);

    const fetchUserBookings = (email) => {
        // In a real app, uncomment this code to fetch from your backend
        axios.get(`https://dreamers-academy.onrender.com/user-bookings/${email}`)
            .then((res) => {
                setBookings(res.data.bookings);
                toast({
                    title: "Bookings loaded",
                    description: "Your course bookings have been loaded successfully.",
                });
            })
            .catch(err => {
                console.error("Error fetching bookings:", err);
                toast({
                    title: "Error loading bookings",
                    description: "There was a problem fetching your bookings.",
                    variant: "destructive"
                });
            });
        
        
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        toast({
            title: "Logged out",
            description: "You have been successfully logged out.",
        });
        navigate("/Login");
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleSectionChange = (section) => {
        setActiveSection(section);
        if (isMobile) {
            setSidebarOpen(false);
        }
    };

    const handleExploreCoursesClick = () => {
        setActiveSection("courses");
        if (isMobile) {
            setSidebarOpen(false);
        }
    };

    const courses = [
        {
            title: "Basic English",
            level: "Beginner",
            duration: "3 months",
            studentsEnrolled: 120,
            isBest: true
        },
        {
            title: "IELTS Preparation",
            level: "Intermediate",
            duration: "2 months",
            studentsEnrolled: 85,
            isBest: true
        },
        {
            title: "Business English",
            level: "Advanced",
            duration: "4 months",
            studentsEnrolled: 64,
            isBest: true
        },
        {
            title: "TOEFL Preparation",
            level: "Intermediate",
            duration: "2 months",
            studentsEnrolled: 72,
            isBest: true
        },
        {
            title: "Conversational English",
            level: "Beginner",
            duration: "2 months",
            studentsEnrolled: 55,
            isBest: false
        },
        {
            title: "English for Medical Professionals",
            level: "Advanced",
            duration: "3 months",
            studentsEnrolled: 42,
            isBest: false
        },
        {
            title: "Academic Writing",
            level: "Intermediate",
            duration: "2 months",
            studentsEnrolled: 38,
            isBest: false
        },
        {
            title: "English for Hospitality",
            level: "Beginner",
            duration: "2 months",
            studentsEnrolled: 45,
            isBest: false
        }
    ];

    const feesStructure = [
        {
            course: "Basic English Course",
            duration: "3 months",
            normalFee: "₹6,000",
            discountedFee: "₹5,200"
        },
        {
            course: "IELTS Preparation",
            duration: "2 months",
            normalFee: "₹8,500",
            discountedFee: "₹7,800"
        },
        {
            course: "Business English",
            duration: "4 months",
            normalFee: "₹10,000",
            discountedFee: "₹9,200"
        },
        {
            course: "TOEFL Preparation",
            duration: "2 months",
            normalFee: "₹8,000",
            discountedFee: "₹7,400"
        }
    ];

    const whyChooseUs = [
        {
            title: "Experienced Faculty",
            description: "Learn from certified trainers with extensive experience in language teaching",
            icon: <Users className="h-6 w-6 text-purple-500" />
        },
        {
            title: "Small Batch Sizes",
            description: "Personalized attention with maximum 8 students per batch",
            icon: <Target className="h-6 w-6 text-purple-500" />
        },
        {
            title: "Modern Teaching Methods",
            description: "Interactive and engaging teaching methodology with latest techniques",
            icon: <Award className="h-6 w-6 text-purple-500" />
        },
        {
            title: "Flexible Schedule",
            description: "Multiple batch timings to suit your convenience",
            icon: <Clock className="h-6 w-6 text-purple-500" />
        },
        {
            title: "Certification",
            description: "Receive industry-recognized certification upon course completion",
            icon: <Medal className="h-6 w-6 text-purple-500" />
        },
        {
            title: "Career Support",
            description: "Guidance for career opportunities and job interviews",
            icon: <Briefcase className="h-6 w-6 text-purple-500" />
        }
    ];

    const sidebarClass = `${
        isMobile 
            ? `fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-20 transform transition-transform duration-300 ease-in-out ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : 'fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg z-10'
    }`;

    const contentClass = isMobile ? 'pl-0' : 'md:pl-64';

    const renderStatsCards = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 animate-fade-in animate-delay-100">
            <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 md:p-6">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
                            <BookOpen className="h-6 w-6 text-purple-500 dark:text-purple-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Courses</p>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">12</h2>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 md:p-6">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
                            <Users className="h-6 w-6 text-purple-500 dark:text-purple-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Students</p>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">350+</h2>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
                <CardContent className="p-4 md:p-6">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
                            <Award className="h-6 w-6 text-purple-500 dark:text-purple-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Success Rate</p>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">92%</h2>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderCourses = () => {
        const displayCourses = showAllCourses ? courses : courses.filter(course => course.isBest);
        
        return (
            <div className="mb-8 md:mb-12 animate-fade-in animate-delay-200">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 md:mb-6">
                    {showAllCourses ? "All Courses" : "Best Courses"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                    {displayCourses.map((course, index) => (
                        <Card key={index}  className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 
                        bg-purple-100 sm:bg-white dark:bg-purple-900/20"
           >
                            <CardContent className="p-4 md:p-6">
                                <div className="flex flex-col h-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                            <BookOpen className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                                        </div>
                                        <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800">
                                            {course.level}
                                        </Badge>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-black mb-2">{course.title}</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <Clock className="h-4 w-4 mr-2" />
                                            <span>{course.duration}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <Users className="h-4 w-4 mr-2" />
                                            <span>{course.studentsEnrolled} students</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                                        <Link to={`/book-seat/${encodeURIComponent(course.title)}`}>
                                            <Button 
                                                className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2"
                                                size="sm"
                                            >
                                                Register
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                
                {/* Only show View More button in Courses section, not in Home */}
                {activeSection === 'courses' && (
                    <div className="mt-6 flex justify-center">
                        <Button 
                            onClick={() => setShowAllCourses(!showAllCourses)} 
                            variant="outline"
                            className="border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30"
                        >
                            {showAllCourses ? "Show Best Courses" : "View More Courses"}
                            {!showAllCourses && <ChevronRight className="ml-1 h-4 w-4" />}
                        </Button>
                    </div>
                )}
            </div>
        );
    };

    const renderFees = () => (
        <div className="mb-8 md:mb-12 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 md:mb-6">Fees Structure</h2>
            <Card className="shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead className="bg-purple-50 dark:bg-purple-900/20">
                            <tr>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Course</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duration</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Normal Fee</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Discounted Fee</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {feesStructure.map((fee, index) => (
                                <tr key={index} className="hover:bg-purple-50/30 dark:hover:bg-purple-900/10 transition-colors">
                                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900 dark:text-white">{fee.course}</td>
                                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 dark:text-gray-400">{fee.duration}</td>
                                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 dark:text-gray-400 line-through">{fee.normalFee}</td>
                                    <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm font-semibold text-green-600 dark:text-green-400">{fee.discountedFee}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            <div className="mt-4 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                <p>* Additional 5% discount for group enrollments of 3 or more students</p>
                <p>* Special packages available for corporate training</p>
            </div>
        </div>
    );

    const renderWhyChooseUs = () => (
        <div className="mb-8 md:mb-12 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 md:mb-6">Why Choose Us</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {whyChooseUs.map((item, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                        <CardContent className="p-4 md:p-6">
                            <div className="flex flex-col h-full">
                                <div className="flex items-center mb-3 md:mb-4">
                                    <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg mr-3">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-base md:text-lg font-semibold text-gray-800 dark:text-white">{item.title}</h3>
                                </div>
                                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">{item.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );

    const renderSchedule = () => (
        <div className="mb-8 md:mb-12 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 md:mb-6">Class Schedule</h2>
            <Card className="shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead className="bg-purple-50 dark:bg-purple-900/20">
                            <tr>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Course</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Days</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</th>
                                <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Teacher</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            <tr className="hover:bg-purple-50/30 dark:hover:bg-purple-900/10 transition-colors">
                                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900 dark:text-white">Basic English</td>
                                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 dark:text-gray-400">Mon, Wed, Fri</td>
                                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 dark:text-gray-400">9:00 AM - 11:00 AM</td>
                                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 dark:text-gray-400">Ms. Johnson</td>
                            </tr>
                            <tr className="hover:bg-purple-50/30 dark:hover:bg-purple-900/10 transition-colors">
                                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900 dark:text-white">IELTS Preparation</td>
                                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 dark:text-gray-400">Tue, Thu</td>
                                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 dark:text-gray-400">4:00 PM - 6:30 PM</td>
                                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 dark:text-gray-400">Mr. Smith</td>
                            </tr>
                            <tr className="hover:bg-purple-50/30 dark:hover:bg-purple-900/10 transition-colors">
                                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900 dark:text-white">Business English</td>
                                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 dark:text-gray-400">Mon, Wed</td>
                                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 dark:text-gray-400">6:00 PM - 8:00 PM</td>
                                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 dark:text-gray-400">Ms. Garcia</td>
                            </tr>
                            <tr className="hover:bg-purple-50/30 dark:hover:bg-purple-900/10 transition-colors">
                                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900 dark:text-white">TOEFL Preparation</td>
                                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 dark:text-gray-400">Sat, Sun</td>
                                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 dark:text-gray-400">10:00 AM - 1:00 PM</td>
                                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 dark:text-gray-400">Mr. Wilson</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );

    const renderMyBookings = () => (
        <div className="mb-8 md:mb-12 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 md:mb-6">Your Booked Courses</h2>
            {bookings.length > 0 ? (
                <Card className="shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead className="bg-purple-50 dark:bg-purple-900/20">
                                <tr>
                                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Course</th>
                                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Batch</th>
                                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Start Date</th>
                                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Progress</th>
                                    <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                {bookings.map((booking, index) => (
                                    <tr key={index} className="hover:bg-purple-50/30 dark:hover:bg-purple-900/10 transition-colors">
                                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900 dark:text-white">{booking.courseTitle}</td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 dark:text-gray-400">{booking.preferredBatch}</td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 dark:text-gray-400">{booking.startDate}</td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 dark:text-gray-400">{booking.progress}</td>
                                        <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-0">
                                                <CheckCircle className="h-3 w-3 mr-1" />
                                                Active
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            ) : (
                <Card>
                    <CardContent className="p-6 text-center">
                        <div className="flex flex-col items-center">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full mb-4">
                                <BookOpen className="h-8 w-8 text-purple-500 dark:text-purple-400" />
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">You haven't booked any courses yet.</p>
                            <Button 
                                onClick={() => handleSectionChange('courses')}
                                className="bg-purple-600 hover:bg-purple-700 text-white"
                            >
                                Browse Courses
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );

    const renderProfile = () => (
        <div className="mb-8 md:mb-12 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 md:mb-6">Your Profile</h2>
            <Card>
                <CardContent className="p-4 md:p-6">
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                                <User className="w-10 h-10 text-purple-500 dark:text-purple-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{user?.name || "Student"}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email || "student@example.com"}</p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Personal Information</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-300">Student ID</span>
                                        <span className="text-sm font-medium text-gray-800 dark:text-white">DR-2023-001</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-300">Joined</span>
                                        <span className="text-sm font-medium text-gray-800 dark:text-white">Jan 15, 2023</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-300">Phone</span>
                                        <span className="text-sm font-medium text-gray-800 dark:text-white">+91 98765 43210</span>
                                    </div>
                                </div>
                            </div>
                            
                            {bookings.length > 0 ? (
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Current Course</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-300">Course</span>
                                            <span className="text-sm font-medium text-gray-800 dark:text-white">{bookings[0].courseTitle}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-300">Batch</span>
                                            <span className="text-sm font-medium text-gray-800 dark:text-white">{bookings[0].preferredBatch}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600 dark:text-gray-300">Progress</span>
                                            <span className="text-sm font-medium text-gray-800 dark:text-white">{bookings[0].progress}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Course Information</h4>
                                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">You are not enrolled in any courses yet.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                            <Button className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white">Edit Profile</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderWelcome = () => (
        <div className="mb-8 md:mb-12 animate-fade-in">
            <Card className="bg-gradient-to-r from-purple-50 to-indigo-50  border-0 shadow-md">
                <CardContent className="p-6 md:p-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-black mb-4">Welcome to Dreamers Academy</h2>
                    <p className="text-gray-600 dark:text-gray-700 mb-6 max-w-3xl">
                        We're dedicated to helping you achieve your language learning goals through expert guidance, 
                        personalized attention, and proven teaching methodologies. Explore our courses and resources
                        to start your language learning journey with us.
                    </p>
                    <Button 
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={handleExploreCoursesClick}
                    >
                        Explore Courses
                    </Button>
                </CardContent>
            </Card>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className={sidebarClass}>
                <div className="p-6">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            <GraduationCap className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600">
                            Dreamers
                        </span>
                    </Link>
                </div>

                <nav className="mt-6 px-4">
                    <div className="space-y-1">
                        <button 
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                                activeSection === 'home' 
                                ? 'text-gray-700 dark:text-gray-200 bg-purple-50 dark:bg-gray-700' 
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            onClick={() => handleSectionChange('home')}
                        >
                            <LayoutDashboard className={`h-5 w-5 ${
                                activeSection === 'home' 
                                ? 'text-purple-500 dark:text-purple-400' 
                                : 'text-gray-500 dark:text-gray-400'
                            }`} />
                            <span>Home</span>
                        </button>

                        <button 
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                                activeSection === 'courses' 
                                ? 'text-gray-700 dark:text-gray-200 bg-purple-50 dark:bg-gray-700' 
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            onClick={() => handleSectionChange('courses')}
                        >
                            <BookOpen className={`h-5 w-5 ${
                                activeSection === 'courses' 
                                ? 'text-purple-500 dark:text-purple-400' 
                                : 'text-gray-500 dark:text-gray-400'
                            }`} />
                            <span>Courses</span>
                        </button>

                        <button 
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                                activeSection === 'my-bookings' 
                                ? 'text-gray-700 dark:text-gray-200 bg-purple-50 dark:bg-gray-700' 
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            onClick={() => handleSectionChange('my-bookings')}
                        >
                            <CheckCircle className={`h-5 w-5 ${
                                activeSection === 'my-bookings' 
                                ? 'text-purple-500 dark:text-purple-400' 
                                : 'text-gray-500 dark:text-gray-400'
                            }`} />
                            <span>My Bookings</span>
                            {bookings.length > 0 && (
                                <Badge className="ml-auto bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">
                                    {bookings.length}
                                </Badge>
                            )}
                        </button>

                        <button 
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                                activeSection === 'fees' 
                                ? 'text-gray-700 dark:text-gray-200 bg-purple-50 dark:bg-gray-700' 
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            onClick={() => handleSectionChange('fees')}
                        >
                            <DollarSign className={`h-5 w-5 ${
                                activeSection === 'fees' 
                                ? 'text-purple-500 dark:text-purple-400' 
                                : 'text-gray-500 dark:text-gray-400'
                            }`} />
                            <span>Fees</span>
                        </button>

                        <button 
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                                activeSection === 'schedule' 
                                ? 'text-gray-700 dark:text-gray-200 bg-purple-50 dark:bg-gray-700' 
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            onClick={() => handleSectionChange('schedule')}
                        >
                            <Calendar className={`h-5 w-5 ${
                                activeSection === 'schedule' 
                                ? 'text-purple-500 dark:text-purple-400' 
                                : 'text-gray-500 dark:text-gray-400'
                            }`} />
                            <span>Schedule</span>
                        </button>

                        <button 
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                                activeSection === 'about' 
                                ? 'text-gray-700 dark:text-gray-200 bg-purple-50 dark:bg-gray-700' 
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            onClick={() => handleSectionChange('about')}
                        >
                            <Award className={`h-5 w-5 ${
                                activeSection === 'about' 
                                ? 'text-purple-500 dark:text-purple-400' 
                                : 'text-gray-500 dark:text-gray-400'
                            }`} />
                            <span>About Us</span>
                        </button>

                        <button 
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                                activeSection === 'profile' 
                                ? 'text-gray-700 dark:text-gray-200 bg-purple-50 dark:bg-gray-700' 
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            onClick={() => handleSectionChange('profile')}
                        >
                            <User className={`h-5 w-5 ${
                                activeSection === 'profile' 
                                ? 'text-purple-500 dark:text-purple-400' 
                                : 'text-gray-500 dark:text-gray-400'
                            }`} />
                            <span>Profile</span>
                        </button>
                    </div>
                </nav>

                {isMobile && sidebarOpen && (
                    <button 
                        onClick={toggleSidebar}
                        className="absolute top-4 right-4 p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
                    >
                        <X className="h-6 w-6" />
                    </button>
                )}
            </div>

            <div className={contentClass}>
                <header className="bg-white dark:bg-gray-800 shadow-sm animate-fade-in">
                    <div className="flex justify-between items-center py-4 px-4 md:px-8">
                        {isMobile && (
                            <button 
                                onClick={toggleSidebar}
                                className="p-2 mr-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                        )}
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
                            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">Welcome back, {user?.name || "Student"}</p>
                        </div>

                        <div className="flex items-center space-x-2 md:space-x-4">
                            

                            <button
                                onClick={handleLogout} 
                                className="flex items-center space-x-1 md:space-x-2 px-3 py-2 md:px-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm md:text-base"
                            >
                                <LogOut className="h-4 w-4" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </header>

                <main className="py-6 px-4 md:py-8 md:px-8  bg-white">
                    {activeSection === 'home' && (
                        <>
                            {renderWelcome()}
                            {bookings.length > 0 && renderMyBookings()}
                            {renderCourses()}
                        </>
                    )}
                    
                    {activeSection === 'courses' && (
                        <>
                            {renderStatsCards()}
                            {renderCourses()}
                        </>
                    )}
                    
                    {activeSection === 'my-bookings' && renderMyBookings()}
                    
                    {activeSection === 'fees' && renderFees()}
                    
                    {activeSection === 'schedule' && renderSchedule()}
                    
                    {activeSection === 'about' && renderWhyChooseUs()}
                    
                    {activeSection === 'profile' && renderProfile()}
                </main>

                <footer className="bg-white dark:bg-gray-800 py-4 md:py-6 px-4 md:px-8 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Dreamers Academy. All rights reserved.</p>
                        <div className="flex items-center space-x-4 md:space-x-6 mt-3 md:mt-0">
                            <a href="#" className="text-xs md:text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">Terms</a>
                            <a href="#" className="text-xs md:text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">Privacy</a>
                            <a href="#" className="text-xs md:text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">Contact</a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};
export default Dashboard; 