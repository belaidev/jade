import React, { useEffect, useRef } from 'react';
import StarRating from './star-rating';
import type { PopularCourse } from '~/feats/asynchronous-courses/functions-said';
import "./popular-card.css";

export default function PopularCard(course: PopularCourse) {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cardRef.current) {
            const cards = document.querySelectorAll('.popular-card');

            // Initial height value
            let maxHeight = 0;

            // Calculate maximum height of popular cards
            cards.forEach((card) => {
                const cardHeight = (card as HTMLElement).getBoundingClientRect().height;
                if (cardHeight > maxHeight) {
                    maxHeight = cardHeight;
                }
            });

            // Adjust padding-bottom of card-text-content based on the maximum height
            cards.forEach((card) => {
                const cardContent = card.querySelector('.card-text-content') as HTMLElement;
                const paddingNeeded = maxHeight - (card.getBoundingClientRect().height);
                cardContent.style.paddingBottom = `${paddingNeeded}px`;
            });
        }
    }, []);

    return (
        <div className='contain'>
            <div className='popular-card' ref={cardRef}>
                <div className='shine'></div>
                <a href={`/details/${course.id}`} className='card-link'>
                    <div className="max-w-sm overflow-hidden rounded shadow-lg card-content">
                        <img className="w-full" src={course.thumbnailUrl} alt={course.title} />
                        <div className="card-text-content px-6 py-4">
                            <div className="mb-2 text-base font-bold md:text-lg">{course.title}</div>
                            <div className="text-black-700 text-sm md:text-base">
                                <p>Professeur: {course.instructor}</p>
                                <p>Durée: {/* Remplir la durée ici si disponible */}</p>
                                <p>Prix: ${course.price}</p>
                                {course.discount ? <p>Discount: {course.discount}%</p> : null}
                                <div className="rating-container">
                                    <span>Note: </span>
                                    <StarRating rating={course.rating !== undefined ? course.rating : 0} />
                                    <span> ({course.rating !== undefined ? course.rating.toFixed(1) : 'No rating'})</span>
                                </div>
                                <p>Id du cours: {course.id}</p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
}
