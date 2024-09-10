'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Image from 'next/image'
import Link from "next/link";
import { toast } from "sonner";
import { db } from "@/lib/db";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when signup starts

    const auth = getAuth();
    try {
      const userauth = await createUserWithEmailAndPassword(auth, email, password);

      const user = userauth.user;
      if (user && user.email) {
        const response = await fetch('/api/user/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            clerkId: user.uid,
            email: user.email,
            isadmin: false,
            isTeacher: false,
            isStudent: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create user in the database');
        }
      }

      router.push("/login");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message); // Use toast.error instead of setting error state
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false); // Set loading to false when signup is done
    }
  };

  const handleGoogleSignup = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      setLoading(true)
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      if (user && user.email) {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            clerkId: user.uid,
            email: user.email,
            isadmin: false,
            isTeacher: false,
            isStudent: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          }),
        });

        if (!response.ok) {
          setLoading(false)
          throw new Error('Failed to create user in the database');
        }
      }
      
      toast.success('Cuenta creada');
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        const errorCode = (error as any).code;
        const errorMessage = error.message;
        const email = (error as any).customData?.email;
        const credential = GoogleAuthProvider.credentialFromError(error as any);

        console.error("Google sign-up error", errorCode, errorMessage);

        toast.error('Error en el registro con Google'); // Use toast.error for Google sign-up errors
      } else {
        toast.error("An unexpected error occurred during Google sign-up");
      }
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <Link href={'/'}>
          <Image src={'/logo-1.png'} className="m-auto" width={100} height={100} alt={'logo'} />
        </Link>
        <h2 className="text-2xl font-bold mb-6 text-center">Registrarse</h2>
        <form onSubmit={handleSignup}>
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
            className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600`}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Cargando...' : 'Registrarse'} {/* Change button text based on loading state */}
          </button>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-600">o</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <button
          onClick={handleGoogleSignup}
          className="w-full bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center justify-center"
        >
          <Image src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className="w-5 h-5 mr-2" width={20} height={20} />
          Registrarse con Google
        </button>
        <p className="text-sm text-center mt-4">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Iniciar Sesión
          </a>
        </p>
      </div>
    </div>
  );
}