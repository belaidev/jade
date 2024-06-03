import { useRef } from 'react';
import StarRating from './star-rating';
import type { PopularCourse } from '~/services/courseData-service';
import { formatDuration } from "~/services/formatDuration-service";
import { useCart } from '~/contexts/CartContext';
import "./popular-card.css";
import "./star-rating.css";
import { Button } from 'shadcn/components/ui';

export default function PopularCard(course: PopularCourse) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { addToCart, isInCart } = useCart();

    return (
        <div className='contain'>
            <div className='popular-card' ref={cardRef}>
                <div className='shine'></div>
                <a href={`/course-detail/${course.id}`} className="card-link">
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
                                <Button className="btn-add"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addToCart(course);
                                    }}
                                    disabled={isInCart(course.id)}
                                >
                                    {isInCart(course.id) ? 'Ajouté' : 'Ajouter au panier'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
}
