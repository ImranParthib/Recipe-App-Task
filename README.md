# Recipe App

A Next.js application that allows users to browse recipes, create accounts, and save their favorite recipes to a cart.

## Features Implemented

### Required Features
- Basic Authentication
  - Complete registration flow with name, email, phone, and password
  - Login/logout functionality with form validation
  - Protected routes and authenticated features
  - Persistent sessions using localStorage

- All Recipes Page
  - Display all available recipes in a grid layout
  - Search functionality to filter recipes
  - Responsive recipe cards with images
  - Recipe details modal view

- Cart Functionality
  - Add recipes to cart (requires authentication)
  - Remove recipes from cart
  - Local storage persistence
  - Cart count in navigation
  - Empty cart state handling

### Additional Improvements
- UI/UX Enhancements
  - Fully responsive design for all screen sizes
  - Loading states with custom spinner
  - Error handling with user feedback
  - Smooth transitions and animations
  - Consistent styling across components
  - Responsive footer with dynamic content
    - Quick links section with authentication-aware navigation
    - Contact information and social media links
    - Proper spacing and mobile optimization

- Performance Optimizations
  - Client-side state management
  - Optimized image loading
  - Proper data caching
  - Efficient API calls

- Code Quality
  - Component reusability
  - Clean code structure
  - Proper TypeScript types
  - Consistent error handling
  - Accessibility improvements

## Bug Fixes

1. Fixed hydration mismatch errors by properly handling client-side state
2. Corrected recipe card key prop from `id` to `idMeal` to match API data
3. Fixed SingleRecipe loading condition that was inversed
4. Improved search functionality in RecipesList component
5. Fixed mobile menu layout and interaction issues

## Technical Implementation

- Used Next.js 13+ with App Router
- Implemented client-side state management with React Context
- Utilized TanStack Query for API data fetching
- Integrated Tailwind CSS for styling
- Added proper TypeScript types and interfaces

## Time Estimate

Total development time: Approximately 1 hour
- Initial setup and bug fixes: 15 minutes
- Authentication implementation: 15 minutes
- Cart functionality: 10 minutes
- UI/UX improvements: 10 minutes
- Loading states and error handling: 10 minutes
- Footer implementation: 5 minutes

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.
