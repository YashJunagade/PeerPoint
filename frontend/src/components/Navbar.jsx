import React, { useState } from "react";
import { Menu, X, User, LogIn, LogOut, ChevronDown, Bell } from "lucide-react";
import { useUser } from "../store/UserContext";
import ConnectionRequests from "./ConnectionRequests";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthenticated, user, logout, isLoading } = useUser();

  if (isLoading) {
    return null;
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 lg:-ml-12">
            <Link to="/" className="flex items-center">
              <span className="text-3xl font-bold text-blue-600">
                PeerPoint
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 text-[18px] font-semibold">
            <Link
              to="/FindPeer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Find Peer
            </Link>
            <Link
              to="/Messenger"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Messenger
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Authentication Section */}
          <div className="hidden md:flex items-center lg:-mr-12">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                {/* Connection Requests Component */}
                <ConnectionRequests />

                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {user.name ? user.name.charAt(0).toUpperCase() : ""}
                      </span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-gray-600">Hi,</p>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <Link
                        to={`/Profile/${user._id}`}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                      <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/signin"
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center space-x-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  <User className="w-5 h-5 text-white" />
                  <span className="text-white">Sign Up</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute bg-white w-full z-10 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated && user && (
              <>
                <div className="px-3 py-2 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">
                        {user.name ? user.name.charAt(0).toUpperCase() : ""}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Welcome back,</p>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                    </div>
                  </div>
                </div>
                {/* Mobile Connection Requests */}
                <div className="px-3 py-2">
                  <ConnectionRequests />
                </div>
              </>
            )}
            <Link
              to="/FindPeer"
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
            >
              Find Peers
            </Link>
            <Link
              to="/Messenger"
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
            >
              Messenger
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
            >
              Contact
            </Link>
          </div>
          {isAuthenticated && user ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="px-2 space-y-1">
                <Link
                  to={`/Profile/${user._id}`}
                  className="flex items-center px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                >
                  <User className="w-5 h-5 mr-2" />
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center w-full px-3 py-2 rounded-md text-red-600 hover:bg-gray-100"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="px-2 space-y-1">
                <Link
                  to="/signin"
                  className="block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
