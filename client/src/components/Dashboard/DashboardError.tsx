import React from 'react';
import { MdErrorOutline } from 'react-icons/md';

interface DashboardErrorProps {
    message: string;
}
export const DashboardError: React.FC<DashboardErrorProps> = ({ message }) => (
    <div className="max-w-5xl mx-auto">
        <div className="flex flex-col justify-center items-center gap-4 bg-gray-700 m-4 p-4 rounded-lg shadow-xl">
            <MdErrorOutline size="2.8rem" color="#ED4245" />
            <div className="text-danger-light text-md font-medium text-center">
                Unfortunately, we have encountered a bit of a problem fetching data from the server.
            </div>
            <div className="text-gray-300 text-base font-medium text-center -mt-2">
                We are attempting to eliminate the issue as soon as possible.
            </div>
            <code className="text-danger-dark text-sm text-center font-semibold mt-2">
                {message}
            </code>
        </div>
    </div>
);
