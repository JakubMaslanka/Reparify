import { IVehicle } from '../../models/vehicle';
import { TransitionWrapper } from "../../utils/TransitionWrapper";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

interface SideBarProps {
    openMenu: boolean;
    userVehicles: IVehicle[];
    children: JSX.Element[] | React.ReactNode;
    setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
    setActiveVehicle: React.Dispatch<React.SetStateAction<IVehicle | null>>;
    setVehicleSelected: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SideBar: React.FC<SideBarProps> = ({
    setOpenMenu,
    setActiveVehicle,
    setVehicleSelected,
    openMenu,
    userVehicles,
    children
}) => {
    const navigate = useNavigate();
    return (
        <TransitionWrapper
            trigger={setOpenMenu}
            triggerVal={openMenu}
            autoRun={false}
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
        >
            <div className="absolute flex flex-row z-50">
                <div className="flex flex-col items-center justify-start w-max h-screen bg-gray-800 shadow-2xl">
                    <div className="w-full text-gray-500 text-xl font-semibold p-4">Reparify</div>
                    <hr className="w-full mb-4 border-gray-500" />
                    <div className="flex flex-col items-center justify-start gap-2 px-4">
                        {userVehicles.map((vehicle: IVehicle) => (
                            <div key={vehicle.id} onClick={() => {
                                setActiveVehicle(vehicle);
                                setVehicleSelected((prev: boolean) => !prev);
                            }} className="relative group">
                                <img src={vehicle.photos[0]} alt="vehiclePicture" className="sidebar-icon" />
                                <span className="sidebar-tooltip group-hover:scale-100 ">
                                    {`${vehicle.mark} ${vehicle.model}`}
                                </span>
                            </div>
                        ))}
                        <div onClick={() => navigate('/vehicle/add')} className="sidebar-icon group">
                            <AiOutlinePlus size="1.6rem" />
                            <span className="sidebar-tooltip group-hover:scale-100 ">
                                Add Vehicle
                            </span>
                        </div>
                    </div>
                </div>
                {children}
            </div>
        </TransitionWrapper>
    );
};
