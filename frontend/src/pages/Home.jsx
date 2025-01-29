import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowRight, Users, Heart, Target } from "lucide-react";

function Home() {
  const universities = [
    { name: "Ahmedabad University", logo: "/university logo/Ahmedabad.jpg" },
    {
      name: "Savitribai Phule Pune University",
      logo: "/university logo/sppu.png",
    },
    {
      name: "AIIMS Mangalagiri",
      logo: "/university logo/AIIMS_Mangalagiri.jpg",
    },
    {
      name: "DIT University Dehradun",
      logo: "/university logo/DIT_University_Dehradun_Logo.jpg",
    },
    {
      name: "Indian Institute of Management",
      logo: "/university logo/Indian_Institute_of_Management_Bodh_Gaya_logo.png",
    },
    { name: "LNMIIT", logo: "/university logo/LNMIIT-logo.png" },
    { name: "IITJ", logo: "/university logo/Logo_IITJ.png" },
    {
      name: "University Of Mumbai",
      logo: "/university logo/Typo.universityofmumbai.png",
    },
    {
      name: "VVIT",
      logo: "/university logo/VVIT_Logo.png",
    },
  ];

  const colleges = [
    {
      name: "St. Xavier's College",
      logo: "/college logo/St. Xavier's College.png",
    },
    {
      name: "Lady Shri Ram College",
      logo: "/college logo/Lady Shri Ram College.png",
    },
    { name: "Loyola College", logo: "/college logo/Loyola College.png" },
    { name: "Christ College", logo: "/college logo/Christ College.jpg" },
    { name: "Miranda House", logo: "/college logo/Miranda House.jpg" },
    { name: "Hindu College", logo: "/college logo/Hindu College.jpg" },
    { name: "KKW College", logo: "/college logo/KKW college.png" },
    {
      name: "Presidency College",
      logo: "/college logo/Presidency College.png",
    },
    { name: "Fergusson College", logo: "/college logo/Fergusson College.jpg" },
    { name: "KTHM College", logo: "/college logo/KTHM College.png" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="flex-grow bg-gradient-to-br from-blue-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex items-center gap-12">
            {/* Left Content */}
            <div className="lg:w-1/2 space-y-8">
              <div className="space-y-4">
                <span className="text-blue-600 font-semibold text-xl italic inline-block border-b-2 border-blue-600 pb-1">
                  Remember,
                </span>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Your problems are not
                  <span className="text-blue-600 block mt-2 transform transition-all hover:translate-x-2">
                    Unique
                  </span>
                </h1>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed">
                Join our community of peers helping peers. Together, we can
                overcome challenges and achieve more.
              </p>
              <div className="flex gap-4 pt-4">
                <button className="group bg-blue-600 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 ease-in-out shadow-md hover:shadow-xl hover:bg-blue-700 transform hover:-translate-y-1">
                  Get Started
                  <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-50 hover:shadow-md transform hover:-translate-y-1">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Image with Animation */}
            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <div className="relative h-96 flex items-center justify-center">
                <div className="absolute w-64 h-64 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
                <img
                  src="/help.png"
                  alt="Helping hand illustration"
                  className="w-full max-w-md animate-float relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* University Logo Scroller */}

      <section className="bg-white py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
            Universities We Cover
          </h2>
          <p className="text-center text-gray-600">
            Supporting students across prestigious Universities in India
          </p>
        </div>

        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

          {/* Scrolling Container */}
          <div className="flex animate-scroll-right">
            {/* First set of logos */}
            <div className="flex space-x-12 px-6">
              {universities.map((uni, index) => (
                <div
                  key={`uni-1-${index}`}
                  className="flex flex-col items-center justify-center min-w-[200px] px-6 py-4"
                >
                  <img
                    src={`${uni.logo}`}
                    alt={`${uni.name} logo`}
                    className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                  <span className="mt-2 text-sm text-gray-600">{uni.name}</span>
                </div>
              ))}
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="flex space-x-12 px-6">
              {universities.map((uni, index) => (
                <div
                  key={`uni-2-${index}`}
                  className="flex flex-col items-center justify-center min-w-[200px] px-6 py-4"
                >
                  <img
                    src={`${uni.logo}`}
                    alt={`${uni.name} logo`}
                    className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                  <span className="mt-2 text-sm text-gray-600">{uni.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* College Logo Scroller - Left to Right */}
      <section className="bg-gray-50 py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
            Seniors from 10000+ Colleges
          </h2>
          <p className="text-center text-gray-600">
            ready to help you in top colleges across the country
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

          <div className="flex animate-scroll-left">
            <div className="flex space-x-12 px-6">
              {colleges.map((college, index) => (
                <div
                  key={`college-1-${index}`}
                  className="flex flex-col items-center justify-center min-w-[200px] px-6 py-4"
                >
                  <img
                    src={college.logo}
                    alt={`${college.name} logo`}
                    className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                  <span className="mt-2 text-sm text-gray-600">
                    {college.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex space-x-12 px-6">
              {colleges.map((college, index) => (
                <div
                  key={`college-2-${index}`}
                  className="flex flex-col items-center justify-center min-w-[200px] px-6 py-4"
                >
                  <img
                    src={college.logo}
                    alt={`${college.name} logo`}
                    className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                  <span className="mt-2 text-sm text-gray-600">
                    {college.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl text-black mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-blue-50 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-transform duration-300">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Connect with Peers</h3>
              <p className="text-gray-600">
                Find people who understand your challenges and can offer genuine
                support.
              </p>
            </div>

            <div className="p-6 bg-green-50 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-transform duration-300">
              <Heart className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Supportive Community
              </h3>
              <p className="text-gray-600">
                Join a caring community that celebrates everyone's growth and
                success.
              </p>
            </div>

            <div className="p-6 bg-orange-50 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-transform duration-300">
              <Target className="w-12 h-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Achieve Together</h3>
              <p className="text-gray-600">
                Reach your goals faster with the support and guidance of your
                peers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 20s linear infinite;
        }

        .animate-scroll-left {
          animation: scroll-left 20s linear infinite;
        }

        .animate-scroll-right:hover,
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
      {/* 
      <p className="text-center font-bold text-gray-800 mb-1.5">
        Created By ❤️🤙🏻 Yash Junagade
      </p> */}
      <Footer />
    </div>
  );
}

export default Home;
