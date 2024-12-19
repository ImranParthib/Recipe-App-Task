import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

const HttpKit = {
  getTopRecipes: async () => {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?f=a"
    );
    const data = await response.json();
    return data.meals;
  },

  getAllRecipes: async () => {
    // For demo purposes, we'll fetch recipes starting with different letters
    const letters = ['a', 'b', 'c', 'd'];
    const promises = letters.map(letter =>
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        .then(res => res.json())
    );
    
    const results = await Promise.all(promises);
    const meals = results.flatMap(result => result.meals || []);
    return meals;
  },

  getRecipeDetails: async (id) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await response.json();
    return data.meals[0];
  },

  searchRecipes: async (query) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await response.json();
    return data.meals;
  },

  getCategories: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories.php`);
      return response.data.categories || [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  filterByCategory: async (category) => {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php`, {
        params: { c: category },
      });
      return response.data.meals || [];
    } catch (error) {
      console.error("Error filtering recipes by category:", error);
      throw error;
    }
  },

  filterByArea: async (area) => {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php`, {
        params: { a: area },
      });
      return response.data.meals || [];
    } catch (error) {
      console.error("Error filtering recipes by area:", error);
      throw error;
    }
  },
};

export default HttpKit;
