import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";
import { TransitionWrapper } from "../../utils/TransitionWrapper";
import { BsBell, BsSearch } from "react-icons/bs";
import { IoMenu, IoLogOutOutline } from "react-icons/io5";

import useClickOutside from "../../hooks/useClickOutside";

interface NavbarProps {
    title: string
}

export const Navbar: React.FC<NavbarProps> = ({title}) => {
    const { currentUser, unauthorize } = useAuth();
    const [openMenu, setOpenMenu] = useState(false);
    const domNode = useClickOutside(() => setOpenMenu(false));
    
    if (!currentUser) {
        return (
            <div className="flex flex-row items-center justify-between bg-gray-700 px-4 py-2 ">
                <div className="text-gray-500 text-xl font-semibold">Reparify</div>
                <Link to="/login" className="bg-greenish-light font-semibold text-gray-100 py-2 px-3 rounded-xl shadow-xl">Login</Link>
            </div>
        )
    }
    return (
        <div ref={domNode}>
            <TransitionWrapper
                trigger={setOpenMenu}
                triggerVal={openMenu}
                autoRun={false}
                enterFrom="-translate-x-full"
                enterTo="translate-x-0">
                <div className="absolute flex flex-col h-screen w-10/12 md:w-4/12 bg-gray-800 shadow-2xl z-50">
                    <div className="w-full text-gray-500 text-xl font-semibold p-4">Reparify</div>
                    <ul className="flex flex-col gap-4 h-full text-white-700 w-full p-4">
                        <li className="text-center bg-gray-700 rounded-lg shadow-xl py-2">Option #1</li>
                        <li className="text-center bg-gray-700 rounded-lg shadow-xl py-2">Option #2</li>
                        <li className="text-center bg-gray-700 rounded-lg shadow-xl py-2">Option #3</li>
                        <li className="text-center bg-gray-700 rounded-lg shadow-xl py-2">Option #4</li>
                    </ul>
                    <div className="flex flex-row items-center justify-start gap-4 p-4">
                        <img src={currentUser.avatar} alt="avatar" className="h-10 rounded-full" />
                        <div className="w-full flex flex-col">
                            <div className="text-gray-300 text-lg font-medium">{`${currentUser.firstName} ${currentUser.lastName}`}</div>
                            <div className="text-gray-500 text-sm font-normal -mt-1">{currentUser.email}</div>
                        </div>
                        <IoLogOutOutline color="#4FDC7C" size="2.5rem" onClick={() => unauthorize()}/>
                    </div>
                </div>
            </TransitionWrapper>
            <div className="flex flex-row items-center bg-gray-700 py-4 px-4">
                <IoMenu onClick={() => setOpenMenu((prev: any) => !prev)} color="#F2F2F2" size="2.2rem" cursor="pointer" />
                <h2 className="w-full text-white-700 px-4 text-lg font-semibold">{title}</h2>
                <div className="flex flex-row gap-2">
                    <div className="p-2 bg-gray-800 rounded-xl">
                        <BsSearch color="#696D73"/>
                    </div>
                    <div className="p-2 bg-gray-800 rounded-xl">
                        <BsBell color="#696D73"/>
                    </div>
                </div>
            </div>
        </div>
    );
};