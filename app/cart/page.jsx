"use client";
import { useCart } from "@/providers/CartProvider";
import Image from "next/image";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import Loader from "@/components/ui/Loader";

export default function Cart() {
  const { cart, removeFromCart, isLoading } = useCart();

  const CartContent = () => {
    if (isLoading) return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader size="large" />
      </div>
    );

    if (cart.length === 0) {
      return (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Cart</h1>
          <p className="text-gray-600 mb-8">Your cart is empty</p>
          <Link
            href="/all-recipes"
            className="inline-block bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition-colors"
          >
            Browse Recipes
          </Link>
        </div>
      );
    }

    return (
      <>
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Cart</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cart.map((recipe) => (
            <div
              key={recipe.idMeal}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <Image
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {recipe.strMeal}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {recipe.strCategory} • {recipe.strArea}
                </p>
                <button
                  onClick={() => removeFromCart(recipe.idMeal)}
                  className="w-full px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-full hover:bg-red-100 transition-colors"
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 pt-32">
        <div className="container mx-auto px-4">
          <CartContent />
        </div>
      </div>
    </ProtectedRoute>
  );
}
