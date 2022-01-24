import { LoadingSpinner } from "./LoadingSpinner";
import { LoadingTimeout } from "./LoadingTimeout";

export const LoadingWithSpinnerAndTimeout = () => (
    <div className="relative">
        <div className="absolute top-12 w-screen">
            <LoadingTimeout />
        </div>
        <LoadingSpinner />
    </div>
);
