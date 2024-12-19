import HttpKit from "@/common/helpers/HttpKit";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import Loader from "../ui/Loader";

const SingleRecipe = ({ id, setIsOpen }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recipe-details", id],
    queryFn: () => HttpKit.getRecipeDetails(id),
  });

  if (isLoading) return (
    <div className="min-h-[300px] flex items-center justify-center">
      <Loader size="default" />
    </div>
  );

  if (error) return (
    <div className="min-h-[300px] flex items-center justify-center text-red-600">
      Error loading recipe details
    </div>
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end">
        <button 
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 text-yellow-900 hover:text-yellow-700"
        >
          Close
        </button>
      </div>
      <div>
        <Image 
          src={data?.strMealThumb} 
          width={500} 
          height={500} 
          alt={data?.strMeal || "Recipe image"} 
        />
      </div>
      <h2 className="text-2xl font-semibold">{data?.strMeal}</h2>
    </div>
  );
};

export default SingleRecipe;
