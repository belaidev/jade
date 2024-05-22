import React from 'react';
import StarRating from './star-rating';
import type { PopularCourse } from '~/feats/asynchronous-courses/functions-said';
import "./popular-card.css";

export default function PopularCard(course: PopularCourse) {
    return (
        <div className='contain'>
            <div className='popular-card'>
                <div className='shine'></div>
                <a href={`/details/${course.id}`} className='card-link'>
                    <div className="max-w-sm overflow-hidden rounded shadow-lg card-content">
                        <img className="w-full" src={course.thumbnailUrl} alt={course.title} />
                        <div className="px-6 py-4">
                            <div className="mb-2 text-base font-bold md:text-base lg:text-lg">{course.title}</div>
                            <p className="text-black-700 text-sm md:text-base">
                                Professeur: {course.instructor}
                                <br />
                                Durée: {/* Remplir la durée ici si disponible */}
                                <br />
                                Prix: {course.price}
                                <br />
                                {course.discount ? <span>Discount: {course.discount}%</span> : null}
                                <br />
                                <div className="rating-container" style={{ display: 'flex', alignItems: 'center' }}>
                                    Note: <StarRating rating={course.rating !== undefined ? course.rating : 0} /> ({course.rating !== undefined ? course.rating.toFixed(1) : 'No rating'})
                                </div>
                                <br />
                                Id du cours: {course.id}
                            </p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
}
