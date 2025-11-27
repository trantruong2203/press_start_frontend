import { useState } from 'react';

interface MediaCarouselProps {
    trailerUrl: string;
    images: string[];
}

export default function MediaCarousel({ trailerUrl, images }: MediaCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // Combine trailer and images into one media array
    const mediaItems = [
        { type: 'video', url: trailerUrl },
        ...images.map(img => ({ type: 'image', url: img }))
    ];

    const handleThumbnailClick = (index: number) => {
        setActiveIndex(index);
        if (index === 0) {
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
        }
    };

    const handlePrevious = () => {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : mediaItems.length - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev < mediaItems.length - 1 ? prev + 1 : 0));
    };

    return (
        <div className="media-carousel">
            {/* Main Display Area */}
            <div className="main-display relative bg-black rounded-lg overflow-hidden">
                {mediaItems[activeIndex].type === 'video' ? (
                    <video
                        key={mediaItems[activeIndex].url}
                        className="w-full aspect-video"
                        controls
                        autoPlay={isPlaying}
                        poster={images[0] || ''}
                    >
                        <source src={mediaItems[activeIndex].url} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <img
                        src={mediaItems[activeIndex].url}
                        alt={`Screenshot ${activeIndex}`}
                        className="w-full aspect-video object-cover"
                    />
                )}

                {/* Navigation Arrows */}
                <button
                    onClick={handlePrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                    aria-label="Previous"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                    aria-label="Next"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Thumbnail Carousel */}
            <div className="thumbnail-carousel mt-4 flex gap-2 overflow-x-auto pb-2">
                {mediaItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        className={`thumbnail-item relative flex-shrink-0 rounded-md overflow-hidden transition-all duration-200 ${
                            activeIndex === index
                                ? 'ring-4 ring-blue-500 scale-105'
                                : 'ring-2 ring-gray-600 hover:ring-gray-400 opacity-70 hover:opacity-100'
                        }`}
                        style={{ width: '160px', height: '90px' }}
                    >
                        {item.type === 'video' ? (
                            <div className="relative w-full h-full bg-gray-800">
                                <img
                                    src={images[0] || ''}
                                    alt="Video thumbnail"
                                    className="w-full h-full object-cover"
                                />
                                {/* Play Icon Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                    <svg
                                        className="w-10 h-10 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        ) : (
                            <img
                                src={item.url}
                                alt={`Thumbnail ${index}`}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </button>
                ))}
            </div>

            <style>{`
                .thumbnail-carousel::-webkit-scrollbar {
                    height: 8px;
                }
                .thumbnail-carousel::-webkit-scrollbar-track {
                    background: #1a1a1a;
                    border-radius: 4px;
                }
                .thumbnail-carousel::-webkit-scrollbar-thumb {
                    background: #4a4a4a;
                    border-radius: 4px;
                }
                .thumbnail-carousel::-webkit-scrollbar-thumb:hover {
                    background: #666;
                }
            `}</style>
        </div>
    );
}
