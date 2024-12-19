"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // Check localStorage for existing user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (userData) => {
    try {
      // Check localStorage for registered users
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const foundUser = registeredUsers.find(
        (user) => user.email === userData.email && user.password === userData.password
      );

      if (!foundUser) {
        throw new Error('Invalid credentials');
      }

      // Create session
      const sessionUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
      };

      setUser(sessionUser);
      localStorage.setItem('user', JSON.stringify(sessionUser));
      router.push('/');
      return sessionUser;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/');
  };

  const register = async (userData) => {
    try {
      // Get existing users or initialize empty array
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      
      // Check if email already exists
      if (existingUsers.some(user => user.email === userData.email)) {
        throw new Error('Email already registered');
      }

      // Create new user
      const newUser = {
        ...userData,
        id: Date.now(),
      };

      // Save to registered users
      existingUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

      // Redirect to login
      router.push('/auth/login');
      return newUser;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 