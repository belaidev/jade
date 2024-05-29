import { useEffect, useRef } from 'react';
import StarRating from './star-rating';
import type { PopularCourse } from '~/services/courseData-service';
import { formatDuration } from "~/services/formatDuration-service";
import "./popular-card.css";
import "./star-rating.css";

export default function PopularCard(course: PopularCourse) {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const adjustCardHeights = () => {
            const cards = document.querySelectorAll('.popular-card');

            let maxHeight = 0;

            cards.forEach((card) => {
                const cardHeight = card.getBoundingClientRect().height;
                if (cardHeight > maxHeight) {
                    maxHeight = cardHeight;
                }
            });

            cards.forEach((card) => {
                const cardContent = card.querySelector('.card-text-content') as HTMLElement;
                const currentHeight = card.getBoundingClientRect().height;
                const paddingNeeded = maxHeight - currentHeight + 10;
                cardContent.style.paddingBottom = `${paddingNeeded}px`;
            });
        };

        const observer = new MutationObserver((mutations) => {
            for (let mutation of mutations) {
                if (mutation.type === 'childList') {
                    adjustCardHeights();
                }
            }
        });

        const config = { childList: true, subtree: true };
        if (cardRef.current) {
            observer.observe(cardRef.current.parentElement!, config);
        }

        // Initial adjustment
        adjustCardHeights();

        // Cleanup observer on component unmount
        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className='contain'>
            <div className='popular-card' ref={cardRef}>
                <div className='shine'></div>
                <a href={`/course-detail/${course.id}`} className='card-link'>
                    <div className="max-w-sm overflow-hidden rounded shadow-lg card-content">
                        <img className="w-full" src={course.thumbnailUrl} alt={course.title} />
                        <div className="card-text-content px-6 py-4">
                            <div className="mb-2 text-base font-bold md:text-lg">{course.title}</div>
                            <div className="text-black-700 text-sm md:text-base">
                                <p>Professeur: {course.instructor}</p>
                                <p>Durée: {formatDuration(course.duration)}</p>
                                <p>Prix: ${course.price}</p>
                                {course.discount ? <p>Promotion: -{course.discount}%</p> : null}
                                <div className="rating-container">
                                    <span>Note: </span>
                                    <StarRating rating={course.rating !== undefined ? course.rating : 0} />
                                    <span> ({course.rating !== undefined ? course.rating.toFixed(1) : 'No rating'})</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
}
