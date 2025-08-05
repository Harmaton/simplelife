'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // Static banner images
    const bannerImages = [
        '/banners/1.png',
        '/banners/2.png',
        '/banners/3.png',
        '/banners/4.png',
        '/banners/5.png'
    ];

    // Memoize navigation functions to prevent unnecessary re-renders
    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, [bannerImages.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1,
        );
    }, [bannerImages.length]);

    // Auto-scroll every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 4000);

        return () => clearInterval(interval);
    }, [nextSlide]);

    return (
        <section className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
            <div
                className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
            >
                {bannerImages.map((imageSrc, index) => (
                    <div key={index} className="min-w-full h-full relative">
                        <div
                            className="absolute inset-0 bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${imageSrc})`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                            }}
                        >
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
                    {bannerImages.map((_, index) => (
                        <button
                            key={index}
                            className={`h-2 w-2 rounded-full transition-all duration-300 ${
                                index === currentIndex 
                                    ? 'bg-white w-8' 
                                    : 'bg-white bg-opacity-50'
                            }`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}