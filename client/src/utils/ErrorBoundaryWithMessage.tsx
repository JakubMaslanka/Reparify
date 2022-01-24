import { useNavigate } from "react-router-dom";
import { Menu } from "../components/Menu";

interface ErrorBoundaryWithMessageProps {
    title: string
    message: string
    withMenu?: boolean
};

export const ErrorBoundaryWithMessage: React.FC<ErrorBoundaryWithMessageProps> = ({
    title, 
    message,
    withMenu = true
}) => {
    const navigate = useNavigate();
    return (
        <>
            {withMenu && <Menu title={title} />}
            <div className="w-full flex flex-col justify-center items-center gap-8">
                <div className="text-2xl text-gray-100 text-center mt-8">{message}</div>
                <button onClick={() => navigate('/dashboard')} className="px-3 py-2 font-light transition ease-in duration-200 uppercase text-md text-greenish-light border-2 border-greenish-light bg-transparent hover:bg-greenish-light hover:text-white-500 rounded-2xl shadow-xl focus:outline-none">
                    Go to Dashboard
                </button>
            </div>
        </>
    );
};