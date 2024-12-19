"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useCart } from "@/providers/CartProvider";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed z-50 w-full bg-white/90 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-yellow-900">
              Tailus <span className="text-yellow-700">Feedus</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/all-recipes"
              className="text-gray-700 hover:text-yellow-700 transition-colors"
            >
              All Recipes
            </Link>
            {user && (
              <Link
                href="/cart"
                className="text-gray-700 hover:text-yellow-700 transition-colors"
              >
                Cart ({cart.length})
              </Link>
            )}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-700">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-yellow-900 bg-yellow-100 rounded-full hover:bg-yellow-200 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-yellow-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 text-sm font-medium text-yellow-900 bg-yellow-100 rounded-full hover:bg-yellow-200 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                href="/all-recipes"
                className="text-gray-700 hover:text-yellow-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                All Recipes
              </Link>
              {user && (
                <Link
                  href="/cart"
                  className="text-gray-700 hover:text-yellow-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cart ({cart.length})
                </Link>
              )}
              {user ? (
                <>
                  <span className="text-gray-700">Welcome, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-yellow-900 bg-yellow-100 rounded-full hover:bg-yellow-200 transition-colors w-full text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-gray-700 hover:text-yellow-700 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-4 py-2 text-sm font-medium text-yellow-900 bg-yellow-100 rounded-full hover:bg-yellow-200 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
