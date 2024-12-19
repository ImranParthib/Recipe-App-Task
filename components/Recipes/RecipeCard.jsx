import Image from "next/image";
import React from "react";
import { useCart } from "@/providers/CartProvider";

const RecipeCard = ({ recipe, handleDetailsOpen }) => {
  const { addToCart, cart } = useCart();
  
  const isInCart = cart.some(item => item.idMeal === recipe.idMeal);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent modal from opening when clicking the cart button
    addToCart(recipe);
  };

  return (
    <div
      onClick={() => handleDetailsOpen(recipe?.idMeal)}
      className="group space-y-6 border border-gray-100 rounded-3xl bg-white px-4 py-4 text-center shadow hover:cursor-pointer hover:shadow-xl transition duration-200 shadow-gray-600/10"
    >
      <Image
        className="mx-auto rounded-2xl"
        src={recipe?.strMealThumb}
        alt={recipe?.strMeal || "Recipe image"}
        loading="lazy"
        width={500}
        height={500}
      />
      <h3 className="text-2xl font-semibold text-gray-800">
        {recipe?.strMeal}
      </h3>
      <p className="text-gray-600">
        {recipe?.strCategory} • {recipe?.strArea}
      </p>
      <div className="relative mx-auto flex items-center justify-center gap-4">
        <button className="text-primary hover:text-yellow-700">
          Click to see details
        </button>
        <button
          onClick={handleAddToCart}
          disabled={isInCart}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            isInCart
              ? "bg-gray-100 text-gray-500 cursor-not-allowed"
              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
          }`}
        >
          {isInCart ? "In Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
