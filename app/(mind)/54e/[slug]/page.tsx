'use client';

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Star, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Nav from '../_components/nav';

// Define types
interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  image: string;
  color: 'purple' | 'blue' | 'orange' | 'teal';
  benefits: string[];
  ingredients: string[];
  contraindications: string[];
  mercadolibre: string;
  rating: number;
  reviews: number;
  featuredReview: string;
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/products.json')
      .then((res) => res.json())
      .then((data: Product[]) => {
        const found = data.find((p) => p.slug === params.slug);
        if (found) {
          setProduct(found);
        } else {
          notFound();
        }
      })
      .catch(() => notFound())
      .finally(() => setLoading(false));
  }, [params.slug]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-600">Cargando producto...</p>
      </div>
    );
  }

  if (!product) return notFound();

  // Helper: Star Rating
  const StarRating = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= product.rating) {
        stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
      } else if (i - 0.5 <= product.rating) {
        stars.push(<Star key={i} className="w-5 h-5 fill-yellow-200 text-yellow-200" />);
      } else {
        stars.push(<Star key={i} className="w-5 h-5 text-gray-300" />);
      }
    }
    return <div className="flex gap-1">{stars}</div>;
  };

  return (
    <>
     <Nav totalCartItems={3} />
    <section className="py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto">

        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-purple-600 transition">Home</Link>
          {' / '}
          <Link href="/54e" className="hover:text-purple-600 transition">54e</Link>
          {' / '}
          <span className="text-gray-800 font-medium">{product.name}</span>
        </nav>

        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/54e"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a 54e
          </Link>
        </div>

        {/* Product Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Info */}
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3">{product.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{product.price}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <StarRating />
              <span className="text-gray-500 text-sm">({product.reviews} reseñas)</span>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

            {/* Buttons */}
            <div className="space-y-3">
              <Link
                href={`/products/${product.slug}`}
                className="block w-full text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                Ver detalles
              </Link>
              <a
                href={product.mercadolibre}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full text-center bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all"
              >
                <ExternalLink className="w-5 h-5" />
                Comprar en Mercado Libre
              </a>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Beneficios</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {product.benefits.map((benefit, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500">✅</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* Ingredients */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Hecho con</h2>
          <p className="text-gray-600">
            {product.ingredients.join(', ')}.
          </p>
        </div>

        {/* Contraindications */}
        <div className="bg-red-50 border border-red-200 p-6 rounded-xl mb-12">
          <h3 className="text-lg font-semibold text-red-800 mb-3">⚠️ Contraindicaciones</h3>
          <ul className="text-red-700 space-y-1">
            {product.contraindications.map((item, i) => (
              <li key={i} className="text-sm">• {item}</li>
            ))}
          </ul>
        </div>

        {/* Certifications Badge */}
        <div className="flex flex-wrap gap-3 mb-12 text-sm">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">Libre de gluten</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">Hipoalergénico</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">Sin OMG</span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Material médico 3M</span>
        </div>

        {/* Reviews Section */}
        <div className="border-t pt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Reseñas de clientes</h2>

          {/* Featured Review */}
          <div className="bg-gray-50 p-6 rounded-xl mb-6">
            <div className="flex items-center gap-2 mb-3">
              <StarRating />
            </div>
            <p className="text-gray-700 italic">&quot;{product.featuredReview}&quot;</p>
            <p className="text-sm text-gray-500 mt-3">— Un cliente satisfecho de 54e</p>
          </div>

          {/* Call to Action: Add Review */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl border border-purple-100 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">¿Usaste este parche?</h3>
            <p className="text-gray-600 mb-4">
              Compartí tu experiencia, foto o video y ayudá a otros a tomar la mejor decisión.
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-medium hover:from-purple-700 hover:to-blue-700 transition">
              Publicar reseña
            </button>
          </div>
        </div>

        {/* Closing Message */}
        <div className="text-center mt-16 italic text-gray-500">
          <p>Con el {product.name} de 54e, vives tu día con intensidad, sin sacrificar tu bienestar.</p>
          <p className="font-semibold text-purple-700 mt-1">Vive mejor. Vive simple. Vive LIVe.</p>
        </div>
      </div>
    </section>
    </>
  );
}