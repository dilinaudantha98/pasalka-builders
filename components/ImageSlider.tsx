
import React, { useState, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

interface ImageSliderProps {
    images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = useCallback(() => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, images.length]);

    const goToNext = useCallback(() => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, images.length]);

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <div className="relative h-96 md:h-[500px] w-full">
            {/* Main Image */}
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <img
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                />
            </div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>

            {/* Controls */}
            <button
                onClick={goToPrevious}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-all focus:outline-none"
            >
                <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
                onClick={goToNext}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-all focus:outline-none"
            >
                <ChevronRightIcon className="h-6 w-6" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, slideIndex) => (
                    <button
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`w-3 h-3 rounded-full transition-all ${
                            currentIndex === slideIndex ? 'bg-cyan-400' : 'bg-white/50 hover:bg-white'
                        }`}
                        aria-label={`Go to slide ${slideIndex + 1}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
