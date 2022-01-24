import { Link } from "react-router-dom";

interface UnauthorizeTopBarProps {
    title: string
};

export const UnauthorizeTopBar: React.FC<UnauthorizeTopBarProps> = ({ 
    title
}) => (
    <div className="flex flex-row items-center justify-between bg-gray-700 px-4 py-2 ">
        <div className="text-gray-500 text-xl font-semibold">
            Reparify
        </div>
        <h2 className="w-full text-center text-gray-300 px-4 text-sm font-semibold">
            {title}
        </h2>
        <Link to="/login" className="bg-greenish-light font-semibold text-gray-100 py-2 px-3 rounded-xl shadow-xl">
            Login
        </Link>
    </div>
);
