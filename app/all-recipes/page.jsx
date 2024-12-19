"use client";
import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import RecipeCard from "@/components/Recipes/RecipeCard";
import Modal from "@/components/Modal";
import SingleRecipe from "@/components/Recipes/SingleRecipe";
import { useState } from "react";
import Loader from "@/components/ui/Loader";

export default function AllRecipes() {
  const [openDetails, setOpenDetails] = useState(false);
  const [recipeId, setRecipeId] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data: recipes, isLoading, error } = useQuery({
    queryKey: ["all-recipes"],
    queryFn: HttpKit.getAllRecipes,
  });

  const handleDetailsOpen = (id) => {
    setOpenDetails(true);
    setRecipeId(id);
  };

  const filteredRecipes = recipes?.filter((recipe) =>
    recipe.strMeal.toLowerCase().includes(searchInput.toLowerCase())
  );

  if (isLoading) return (
    <div className="min-h-screen pt-32 flex items-center justify-center">
      <Loader size="large" />
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen pt-32 flex items-center justify-center text-red-600">
      Error loading recipes: {error.message}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">All Recipes</h1>
        
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes?.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              handleDetailsOpen={handleDetailsOpen}
            />
          ))}
        </div>

        <Modal isOpen={openDetails} setIsOpen={setOpenDetails}>
          <SingleRecipe id={recipeId} setIsOpen={setOpenDetails} />
        </Modal>
      </div>
    </div>
  );
}
