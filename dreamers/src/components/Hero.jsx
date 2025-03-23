import React from 'react';
import { GraduationCap, Book, Users, Award, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  
  
  
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-white via-purple-50 to-blue-50">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute bottom-1/4 right-1/3 w-60 h-60 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column: Content */}
          <div className="flex flex-col space-y-6">
            {/* Badge */}
            <div className="flex items-center space-x-2 bg-white border border-purple-100 rounded-full pl-2 pr-4 py-1 shadow-sm w-fit">
              <span className="flex items-center justify-center bg-purple-500 text-white p-1 rounded-full">
                <Sparkles className="h-3 w-3" />
              </span>
              <span className="text-xs font-medium text-purple-700">Inspiring young minds</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
              Unlock Your 
              <span className="text-purple-600 block">Full Potential</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 max-w-xl">
              At Dreamers Academy, we nurture curious minds and foster academic excellence 
              through personalized learning paths, expert instructors, and an innovative curriculum.
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg text-purple-500">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Expert Tutors</h3>
                  <p className="text-sm text-gray-500">Qualified educators</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-500">
                  <Book className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Custom Curriculum</h3>
                  <p className="text-sm text-gray-500">Tailored learning</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-pink-100 rounded-lg text-pink-500">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Small Class Sizes</h3>
                  <p className="text-sm text-gray-500">Personal attention</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-amber-100 rounded-lg text-amber-500">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Proven Results</h3>
                  <p className="text-sm text-gray-500">Excellence track record</p>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 mt-4">
              <Button 
                onClick={() => navigate("/signup")}
                size="lg"
                className="rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors group touch-manipulation"
              >
                Enroll Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="rounded-full border-gray-300 hover:bg-gray-50 transition-colors touch-manipulation"
              >
                Schedule Tour
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-col space-y-2 pt-6 border-t border-gray-200 mt-4">
              <p className="text-sm font-medium text-gray-500">Trusted by parents across 20+ communities</p>
              <div className="flex space-x-4">
                <div className="text-xs text-gray-500 flex items-center">
                  <span className="text-yellow-500 text-lg mr-1">★</span> 4.9/5 Average Rating
                </div>
                <div className="text-xs text-gray-500 flex items-center">
                  <span className="font-medium text-gray-700 mr-1">2500+</span> Students Enrolled
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Image */}
          <div className="relative h-[400px] sm:h-[500px] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Decorative circle behind the image */}
              <div className="w-5/6 h-5/6 rounded-full bg-gradient-to-tr from-purple-100 to-white border border-purple-200 opacity-80" />
            </div>
            
            {/* Main image with slight shadow and border */}
            <div className="relative w-[90%] h-[90%] rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <img 
                src="/placeholder.svg" 
                alt="Students learning at Dreamers Academy" 
                className="w-full h-full object-cover"
              />
              
              {/* Overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent"></div>
              
              {/* Text overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-xl font-bold">Where Dreams Take Flight</h3>
                <p className="text-sm opacity-90">Creating tomorrow's leaders today</p>
              </div>
            </div>
            
            {/* Floating card element */}
            <div className="absolute top-10 -right-6 bg-white rounded-xl shadow-lg p-4 w-48 border border-purple-100">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <GraduationCap className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">98% Success</p>
                  <p className="text-xs text-gray-500">Academic improvement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
