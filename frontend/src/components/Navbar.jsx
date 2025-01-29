import React, { useState } from "react";
import { Menu, X, User, LogIn } from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 lg:-ml-12">
            <a href="/" className="flex items-center">
              <span className="text-3xl font-bold text-blue-600">
                PeerPoint
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 text-[18px] font-semibold">
            <a
              href="/FindPeer"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Find Peer
            </a>
            <a
              href="/Messenger"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Messenger
            </a>
            <a
              href="/contact"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center space-x-4 lg:-mr-12">
            <a
              href="/signin"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <LogIn className="w-5 h-5" />
              <span>Sign In</span>
            </a>
            <a
              href="/signup"
              className="flex items-center space-x-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <User className="w-5 h-5 text-white" />
              <span className="text-white">Sign Up</span>
            </a>
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
        <div className="md:hidden absolute bg-white w-full z-1">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="/FindPeer"
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
            >
              Find Peers
            </a>
            <a
              href="/Messenger"
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
            >
              Messenger
            </a>
            <a
              href="/contact"
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
            >
              Contact
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2 space-y-1">
              <a
                href="/signin"
                className="block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
              >
                Sign In
              </a>
              <a
                href="/signup"
                className="block px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
