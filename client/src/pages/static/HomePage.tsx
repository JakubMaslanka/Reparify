import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Icon } from '../media/reparify_logo.svg';
import { AiFillLinkedin, AiOutlineGithub } from 'react-icons/ai';
import { Transition } from '@headlessui/react';

export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Transition
            appear={true}
            show={true}
        >
            <>
                <div className="relative h-full xxs:h-screen">
                    <div className="max-w-7xl mx-auto h-full">
                        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20  lg:w-full lg:pb-28 xl:pb-32 h-full">
                            <Nav />
                            <main className="mt-10 mx-auto px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 h-full">
                                <div className="flex flex-col md:flex-row w-full items-start justify-between md:justify-start h-full md:h-1/2">
                                    <div className="text-left z-20 md:z-30 w-full md:w-1/2 flex flex-col items-center md:items-start justify-start md:justify-center h-full">
                                        <h1 className="tracking-tight font-extrabold text-gray-900 titleHome text-6xl ">
                                        <Transition.Child
                                            enter="transition ease-in duration-500 transform"
                                            enterFrom="-translate-x-full opacity-0"
                                            enterTo="translate-x-0 opacity-100"
                                            leave="transition ease-in duration-500 transform"
                                            leaveFrom="translate-x-0 opacity-100"
                                            leaveTo="-translate-x-full opacity-0"
                                        >
                                            <span className="flex w-full m-auto text-greenish-light">
                                                Reparify
                                            </span>
                                        </Transition.Child>
                                        <Transition.Child
                                            enter="transition ease-in duration-500 transform delay-300"
                                            enterFrom="-translate-x-full opacity-0"
                                            enterTo="translate-x-0 opacity-100"
                                            leave="transition ease-in duration-500 transform delay-300"
                                            leaveFrom="translate-x-0 opacity-100"
                                            leaveTo="-translate-x-full opacity-0"
                                        >
                                            <span className="block font-bold xl:inline text-gray-200">
                                                Vehicle Story<br/>
                                            </span>
                                        </Transition.Child>
                                        <Transition.Child
                                            enter="transition ease-in duration-700 transform delay-500"
                                            enterFrom="-translate-x-full opacity-0"
                                            enterTo="translate-x-0 opacity-100"
                                            leave="transition ease-in duration-700 transform delay-500"
                                            leaveFrom="translate-x-0 opacity-100"
                                            leaveTo="-translate-x-full opacity-0"
                                        >
                                            <span className="block font-bold xl:inline text-gray-200">
                                                Starts Here
                                            </span>
                                        </Transition.Child>
                                        </h1>
                                        <Transition.Child
                                            enter="transition ease-in duration-700 transform delay-1000"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="transition ease-in duration-700 transform delay-1000"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <h2 className="mt-3  text-gray-400 sm:mt-5 text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                                Reparify is a web app that allows users to
                                                <span className="text-greenish-dark font-semibold">&nbsp;store&nbsp;</span> 
                                                their vehicle's repair actions in one place, 
                                                <span className="text-greenish-dark font-semibold">&nbsp;sell&nbsp;</span> 
                                                them to other users, or 
                                                <span className="text-greenish-dark font-semibold">&nbsp;rate&nbsp;</span> 
                                                the profile of the repair shop where a vehicle was serviced. Also it&#x27;s all free and open-source.
                                            </h2>
                                            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start w-full">
                                                <div className="rounded-md shadow">
                                                    <button onClick={() => navigate('/login')} className="w-full flex items-center justify-center px-8 py-3  text-base font-medium rounded-md text-white bg-greenish-light hover:bg-greenish-dark">
                                                        Get started
                                                    </button>
                                                </div>
                                                <div className="mt-3 sm:mt-0 sm:ml-3 rounded-md shadow">
                                                    <a target="_blank" rel="noreferrer" href="https://github.com/JakubMaslanka/Reparify" className="w-full h-full flex items-center justify-center text-base font-medium rounded-md text-gray-800 bg-gray-100 hover:bg-gray-200 px-4 py-2">
                                                        <AiOutlineGithub size="1.4rem" />
                                                        <span className="ml-2">
                                                            Github
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="mt-4 text-gray-400 opacity-70">
                                                Interested in helping with project development?
                                                <a href="https://github.com/JakubMaslanka/Reparify/pulls" rel="noreferrer" className="underline text-greenish-dark hover:text-greenish-light transition-all duration-100 ease-in-out ml-1 cursor-pointer">
                                                    Contribute to it
                                                </a>
                                            </div>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                <Footer />
                </div>
            </>
        </Transition>
    )
}

const Nav = () => (
    <nav className="relative z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className=" flex justify-between items-center  border-gray-100 py-6  md:space-x-10">
                <div className="flex justify-start items-center gap-12">
                    <div className="flex items-center cursor-default">
                        <Icon fill='#C0C0C0' className="h-12 w-auto sm:h-12"/>
                        <span className="text-greenish-light ml-2 text-xl font-bold">
                            Reparify
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </nav>
);

const Footer = () => (
    <footer className="px-3 py-8 bg-gray-300 text-2 text-gray-600 transition-colors duration-200 shadow-2xl">
        <div className="flex flex-col">
            <div className="md:hidden mt-7 mx-auto w-11 h-px rounded-full">
            </div>
            <div className="mt-4 md:mt-0 flex flex-col md:flex-row">
                <div className="flex-1 flex flex-col items-center justify-center md:items-end md:border-r border-gray-400 opacity-70 md:pr-5">
                    <span className="text-lg hover:text-gray-700 cursor-default font-bold">
                        Reparify
                    </span>
                </div>
                <div className="md:hidden mt-4 mx-auto w-41  opacity-70h-px rounded-full">
                </div>
                <div className="mt-4 md:mt-0 flex-1 flex items-center justify-center md:border-r border-gray-400 opacity-70">
                    <a href="https://github.com/JakubMaslanka">
                        <span className="sr-only">
                            Check my GitHub
                        </span>
                        <AiOutlineGithub size="2rem" className="hover:text-gray-700" />
                    </a>
                    <div className="ml-4">
                        <a href="https://www.linkedin.com/in/jakub-ma%C5%9Blanka-29b2001a6/">
                        <span className="sr-only">
                            Add me to contact on LinkedIn
                        </span>
                        <AiFillLinkedin size="2rem" className="hover:text-gray-700" />
                    </a>
                    </div>
                </div>
                <div className="md:hidden mt-4 mx-auto w-11 h-px rounded-full ">
                </div>
                <div className="mt-7 md:mt-0 flex-1 flex flex-col items-center justify-center md:items-start md:pl-5">
                    <span>
                        © {new Date(Date.now()).getFullYear()}
                    </span>
                    <span className="mt-7 md:mt-1">
                        Created by&nbsp;
                        <a className="underline hover:text-gray-800" href="https://github.com/JakubMaslanka">
                            Jakub Maślanka
                        </a>
                    </span>
                </div>
            </div>
        </div>
    </footer>
);