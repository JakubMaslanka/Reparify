import { IComment } from '../../models/comment';
import { RatingByStar } from "./RatingByStar";

interface CommentElementProps {
    comment: IComment;
}

export const CommentElement: React.FC<CommentElementProps> = ({ comment }) => (
    <div className="bg-gray-700 w-full rounded-lg p-4 mb-6 shadow sm:inline-block">
        <div className="flex items-start text-left">
            <div className="flex-shrink-0">
                <div className="inline-block relative">
                    <div className="block relative">
                        <img alt="profil" src={comment.author.avatar} className="mx-auto object-cover rounded-full h-12 w-12 " />
                    </div>
                </div>
            </div>
            <div className="ml-6">
                <p className="flex items-baseline">
                    <span className="text-gray-200 font-bold">
                        {`${comment.author.firstName} ${comment.author.lastName}`}
                    </span>
                    <span className="text-gray-400 ml-2 text-sm">
                        {elapsedTimeFromNow(new Date(+comment.createdAt))}
                    </span>
                </p>
                <div className="flex items-center mt-1">
                    <RatingByStar rateAsNumber={+comment.rating} />
                </div>
                <div className="mt-3">
                    <p className="text-gray-300 mt-1 max-w-full break-words">
                        {comment.content}
                    </p>
                </div>
            </div>
        </div>
    </div>
);

function elapsedTimeFromNow(previous: Date): string {
    const currentTime: Date = new Date(Date.now());
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed: number = +currentTime - +previous;

    if (elapsed < msPerMinute)
        return `${Math.round(elapsed / 1000)} seconds ago`;
    else if (elapsed < msPerHour)
        return `${Math.round(elapsed / msPerMinute)} minutes ago`;
    else if (elapsed < msPerDay)
        return `${Math.round(elapsed / msPerHour)} hours ago`;
    else if (elapsed < msPerMonth)
        return `${Math.round(elapsed / msPerDay)} days ago`;
    else if (elapsed < msPerYear)
        return `${Math.round(elapsed / msPerMonth)} months ago`;
    else
        return `${Math.round(elapsed / msPerYear)} years ago`;
};
