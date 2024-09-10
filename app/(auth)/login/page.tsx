'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from 'next/image'
import Link from "next/link";
import { auth } from '@/firebase'
import { toast } from "sonner";
import { db } from "@/lib/db";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      if (user) {
        const response = await fetch(`/api/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid: user.user.uid }),
        });

        const data = await response.json(); // Expecting a JSON response

        if (!response.ok || !data.exists) {
          toast.error('Por favor, regístrate');
          return;
        }
      }
      
      toast.success('Inicio de sesión exitoso');
      router.push("/dashboard");
    } catch (error) {
      setError("Error en el inicio de sesión");
      toast.error('Error en el inicio de sesión');
    }
  };

  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        const response = await fetch('/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid: user.uid }),
        });

        if (!response.ok) {
          toast.error('Por favor, regístrate');
          return;
        }
      }
      
      toast.success('Inicio de sesión con Google exitoso');
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message;
        console.error("Google login error", errorMessage);
        toast.error('Error en el inicio de sesión con Google');
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred during Google login");
        toast.error('Error inesperado en el inicio de sesión con Google');
      }
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <Link href={'/'} >
          <Image src={'/logo-1.png'} className="m-auto" width={100} height={100} alt={'logo'} />
        </Link>
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-600">o</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center justify-center"
        >
          <Image src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className="w-5 h-5 mr-2" width={20} height={20} />
          Iniciar sesión con Google
        </button>
        <div className="flex flex-col items-center mt-4">
          <p className="text-sm text-center">
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Iniciar Sesión
            </a>
          </p>
          <p className="text-sm text-center mt-2">
            ¿No tienes una cuenta?{" "}
            <a href="/sign-up" className="text-blue-600 hover:underline">
              Registrarse
            </a>
          </p>
          <p className="text-sm text-center mt-2">
            ¿Olvidaste tu contraseña?{" "}
            <a href="/reset-password" className="text-blue-600 hover:underline">
              Restablecer Contraseña
            </a>
          </p>
        </div>
      </div>
      </div>
  );
}
