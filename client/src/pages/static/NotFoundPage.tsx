import { useNavigate } from 'react-router-dom';
import { ReactComponent as AppLogo } from '../media/reparify_logo.svg';
import { ReactComponent as PageNotFoundIllustration  } from '../media/404illustration.svg';

export const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <main className="overflow-hidden h-screen relative">
            <header className="absolute top-0 left-0 right-0 z-20">
                <nav className="container mx-auto px-6 md:px-12 py-4">
                    <div className="relative z-40">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <div className=" flex justify-between items-center  border-gray-100 py-6  md:space-x-10">
                                <div className="flex justify-start items-center gap-12">
                                    <div onClick={() => navigate('/')} className="flex items-center cursor-pointer">
                                        <AppLogo fill='#C0C0C0' className="h-12 w-auto sm:h-12" />
                                        <span className="text-greenish-light ml-2 text-xl font-bold hover:underline">
                                            Reparify
                                        </span>
                                    </div>
                                </div>
                                <div className="hidden sm:flex flex-row gap-4">
                                    <button onClick={() => navigate('/login')} className="px-3 py-1 font-medium transition ease-in duration-200 uppercase text-sm text-greenish-dark border-2 border-greenish-dark bg-transparent hover:bg-greenish-dark hover:text-white-500 rounded-lg shadow-xl focus:outline-none">Login</button>
                                    <button onClick={() => navigate('/signup')} className="px-3 py-1 font-medium transition ease-in duration-200 uppercase text-sm text-greenish-light border-2 border-greenish-light bg-transparent hover:bg-greenish-light hover:text-white-500 rounded-lg shadow-xl focus:outline-none">signup</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="container mx-auto mt-8 px-6 md:px-12 relative z-10 flex items-center py-32">
                <div className="container mx-auto px-6 flex flex-col justify-between items-center relative">
                    <div className="flex w-full items-center justify-center space-x-12 flex-col md:flex-row mb-16 md:mb-8">
                        <h1 className="font-thin text-center text-6xl text-greenish-light uppercase">
                            Got Lost?
                        </h1>
                    </div>
                    <div className="block w-full mx-auto mt-6 md:mt-0 relative">
                        <PageNotFoundIllustration />
                    </div>
                    <div className="mt-8">
                        <button onClick={() => navigate('/')} className="px-3 py-2 w-56 font-light transition ease-in duration-200 uppercase text-2xl text-greenish-light border-2 border-greenish-light bg-transparent hover:bg-greenish-light hover:text-white-500 rounded-2xl shadow-xl focus:outline-none">
                            Take Me Home
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};