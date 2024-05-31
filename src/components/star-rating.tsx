import React, { useEffect, useState } from 'react';

interface StarRatingProps {
    rating: number;
}
const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    const [stars, setStars] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const nombreEntier = Math.floor(rating);
        const nombreDemiEtoiles = rating % 1 >= 0.5 ? 1 : 0;

        let etoilesHTML = [];
        for (let i = 0; i < 5; i++) {
            if (i < nombreEntier) {
                etoilesHTML.push(<MdiStar key={i} className="star full" />);
            } else if (i === nombreEntier && nombreDemiEtoiles > 0) {
                etoilesHTML.push(<MdiStarHalfFull key={i} className="star half" />);
            } else {
                etoilesHTML.push(<MdiStarOutline key={i} className="star empty" />);
            }
        }
        setStars(etoilesHTML);
    }, [rating]);

    return <div className="star-rating">{stars}</div>;
};
export default StarRating;