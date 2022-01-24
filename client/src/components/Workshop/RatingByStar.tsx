interface RatingByStarProps {
    rateAsNumber: number;
}

export const RatingByStar: React.FC<RatingByStarProps> = ({ rateAsNumber }): JSX.Element => {
    if (rateAsNumber > 5)
        rateAsNumber = 5;
    if (rateAsNumber < 0)
        rateAsNumber = 0;
    const roundedNumber = Math.round(rateAsNumber);
    const starsArray = [
        //@ts-ignore
        ...Array(5).keys()
    ].map(idx => idx < roundedNumber);

    return (
        <div className="flex items-center mt-1">
            {starsArray.map((isStar, idx) => isStar ? (
                <svg key={idx} xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 1792 1792">
                    <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" />
                </svg>
            ) : (
                <svg key={idx} xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 1792 1792">
                    <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" />
                </svg>
            ))}
        </div>
    );
};