"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { GraduationCap, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Credenciales incorrectas. Por favor verifica tu correo y contraseña.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Demasiados intentos fallidos. Intenta más tarde.');
      } else {
        setError('Ocurrió un error al iniciar sesión. Intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex justify-center items-center p-3 rounded-2xl bg-primary/5 text-primary mb-2">
            <GraduationCap size={40} />
          </div>
          <h2 className="text-3xl font-black text-primary tracking-tight">
            Acceso Administrativo
          </h2>
          <p className="text-sm text-gray-500">
            Sistema Integral de Gestión de Certificaciones
          </p>
        </div>

        {/* Error Message */}
        {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={16} />
                {error}
            </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1 ml-1">
                Correo Electrónico
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@uapa.edu.do"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 rounded-xl"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1 ml-1">
                <label htmlFor="password" className="block text-sm font-bold text-gray-700">
                  Contraseña
                </label>
                <Link href="#" className="text-xs font-medium text-accent hover:underline tabindex={-1}">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 rounded-xl"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-base font-bold rounded-xl shadow-lg shadow-primary/20"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Iniciando...
              </>
            ) : (
              'Ingresar al Sistema'
            )}
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 mt-8">
            &copy; {new Date().getFullYear()} UAPA - Todos los derechos reservados.
        </div>
      </div>
    </div>
  );
}
