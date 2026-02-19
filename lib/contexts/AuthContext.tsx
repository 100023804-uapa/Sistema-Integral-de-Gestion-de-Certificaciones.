"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthProvider: Initializing...");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("AuthProvider: Auth state changed", user ? `User: ${user.email}` : "No user");
      setUser(user);
      setLoading(false);
    });

    // Timeout de seguridad en caso de que Firebase tarde mucho
    const timeout = setTimeout(() => {
        if (loading) {
            console.warn("AuthProvider: Loading timeout reached (10s). Forcing loading to false.");
            setLoading(false);
        }
    }, 10000);

    return () => {
        unsubscribe();
        clearTimeout(timeout);
    };
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {!loading ? (
        children
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-[var(--color-background)]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
    </AuthContext.Provider>
  );
}
