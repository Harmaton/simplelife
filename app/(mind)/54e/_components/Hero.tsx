'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Product } from './products';
import Link from 'next/link';

export default function Hero() {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Load products from JSON
    useEffect(() => {
        fetch('/data/products.json')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    // Memoize navigation functions to prevent unnecessary re-renders
    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, [products.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? products.length - 1 : prevIndex - 1,
        );
    }, [products.length]);

    // Auto-scroll every 3 seconds
    useEffect(() => {
        if (products.length === 0) return; // Don't start interval if no products

        const interval = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(interval);
    }, [nextSlide, products.length]);

    // Don't render if no products are loaded yet
    if (products.length === 0) {
        return (
            <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gray-200 flex items-center justify-center">
                <div className="text-gray-500">Loading...</div>
            </section>
        );
    }

    return (
        <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
            <div
                className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
            >
                {products.map((item, index) => (
                    <div key={item.id} className="min-w-full h-full relative">
                        <div
                            className="absolute inset-0 bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${item.image})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="container mx-auto px-6 md:px-20 text-center md:text-left">
                                <div className="max-w-lg">
                                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                        {item.name}
                                    </h2>
                                    <p className="text-xl text-white mb-6">
                                        {item.shortDescription}
                                    </p>
                                    <p className="text-3xl font-bold text-white mb-6">
                                        {item.price}
                                    </p>
                                    <Link href={item.mercadolibre} target="_blank" className="inline-block mb-4">
                                    <button className="bg-blue-600  hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-md transition duration-300">
                                        Comprar ahora
                                    </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Carousel Controls */}
            <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 transition duration-300 z-10"
                onClick={prevSlide}
                aria-label="Previous slide"
            >
                <ChevronLeftIcon size={24} className="text-white" />
            </button>
            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 transition duration-300 z-10"
                onClick={nextSlide}
                aria-label="Next slide"
            >
                <ChevronRightIcon size={24} className="text-white" />
            </button>

            {/* Carousel Indicators */}
            <div className="absolute bottom-6 left-0 right-0 z-10">
                <div className="flex justify-center space-x-2">
                    {products.map((_, index) => (
                        <button
                            key={index}
                            className={`h-2 w-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white w-8' : 'bg-white bg-opacity-50'}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}