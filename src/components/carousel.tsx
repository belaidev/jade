import React, { useEffect, useState } from "react";
import "./carousel.css";

interface CarouselProps {
	images: string[];
	interval?: number;
}

const CarouselIndicators: React.FC<{
	images: string[];
	activeIndex: number;
	onClick: (index: number) => void;
}> = ({ images, activeIndex, onClick }) => {
	return (
		<div className="carousel__indicators">
			{images.map((_, index) => (
				<span
					key={index}
					className={`carousel__indicator ${index === activeIndex ? "active" : ""}`}
					onClick={() => onClick(index)}
				/>
			))}
		</div>
	);
};

const Carousel: React.FC<CarouselProps> = ({ images, interval = 5000 }) => {
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const nextSlide = () => {
		setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
	};

	useEffect(() => {
		const autoPlayInterval = setInterval(nextSlide, interval);
		return () => {
			clearInterval(autoPlayInterval);
		};
	}, [interval]);

	const prevSlide = () => {
		setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
	};

	const goToSlide = (index: number) => {
		setActiveIndex(index);
	};

	return (
		<div className="carousel">
			<button onClick={prevSlide} className="carousel__btn carousel__btn--prev">
				&lt;
			</button>
			<img src={images[activeIndex]} alt={`Slide ${activeIndex}`} className="carousel__img" />
			<button onClick={nextSlide} className="carousel__btn carousel__btn--next">
				&gt;
			</button>
			<CarouselIndicators images={images} activeIndex={activeIndex} onClick={goToSlide} />
		</div>
	);
};

export default Carousel;
