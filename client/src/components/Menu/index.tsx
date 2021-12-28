import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";
import { Vehicle } from '../../models/vehicle';

import { ActiveVehicleBar } from "./ActiveVehicleBar";
import { TopNavigation } from "./TopNavigation";
import { FooterBar } from "./FooterBar";
import { SideBar } from "./SideBar";

import useClickOutside from "../../hooks/useClickOutside";

interface MenuProps {
    title: string
    userVehicles: Vehicle[]
}

export const Menu: React.FC<MenuProps> = ({ title, userVehicles }) => {
    const { currentUser, unauthorize } = useAuth();

    const [openMenu, setOpenMenu] = useState(false);
    const [isVehicleSelected, setVehicleSelected] = useState(false);
    const [activeVehicle, setActiveVehicle] = useState<Vehicle | null>(null);
    
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
            <SideBar 
                setOpenMenu={setOpenMenu}
                openMenu={openMenu}
                userVehicles={userVehicles}
                setActiveVehicle={setActiveVehicle}
                setVehicleSelected={setVehicleSelected}
            >
                {
                    activeVehicle && 
                    <ActiveVehicleBar 
                        setVehicleSelected={setVehicleSelected}
                        isVehicleSelected={isVehicleSelected}
                        activeVehicle={activeVehicle}
                    />
                }
            </SideBar>
            <FooterBar 
                setOpenMenu={setOpenMenu}
                openMenu={openMenu} 
                currentUser={currentUser} 
                unauthorize={unauthorize}
            />
            <TopNavigation 
                title={title} 
                menuHandler={setOpenMenu}
            />
        </div>
    );
};