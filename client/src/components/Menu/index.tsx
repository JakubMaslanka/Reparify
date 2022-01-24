import { useState } from "react";
import { useAuth } from "../../utils/AuthProvider";
import { IVehicle } from '../../models/vehicle';

import { ActiveVehicleBar } from "./ActiveVehicleBar";
import { TopBar } from "./TopBar";
import { FooterBar } from "./FooterBar";
import { SideBar } from "./SideBar";
import { UnauthorizeTopBar } from "./UnauthorizeTopBar";

import { RepairCreateAndUpdateForm } from "../Vehicle/mutations/RepairCreateAndUpdateForm";
import { VehicleMarkForSaleAction } from "../Vehicle/mutations/VehicleMarkForSaleAction";
import { VehicleArchiveButton } from "../Vehicle/mutations/VehicleArchiveButton";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER_VEHICLE } from "../../api/queries";

import useClickOutside from "../../hooks/useClickOutside";
import useDialog from "../../hooks/useDialog";
import Toast from "../../utils/Toast";

interface MenuProps {
    title: string
}

export const Menu: React.FC<MenuProps> = ({ title }) => {
    const { currentUser, unauthorize } = useAuth();

    const { 
        loading, 
        data 
    } = useQuery(GET_CURRENT_USER_VEHICLE, {
        onError: error => Toast("error", error.message),
        errorPolicy: "all"
    });
    const { 
        setDialogClose: setCreateRepairClose,
        setDialogOpen: setCreateRepairOpen,
        DialogContainer: DialogCreateRepairEntry
    } = useDialog();
    const { 
        setDialogClose: setArchiveDialogClose,
        setDialogOpen: setArchiveDialogOpen,
        DialogContainer: DialogArchiveVehicle
    } = useDialog();
    const {
        setDialogClose: setMarkForSaleDialogClose,
        setDialogOpen: setMarkForSaleDialogOpen,
        DialogContainer: DialogMarkForSaleVehicle
    } = useDialog();

    const [openMenu, setOpenMenu] = useState(false);
    const [isVehicleSelected, setVehicleSelected] = useState(false);
    const [activeVehicle, setActiveVehicle] = useState<IVehicle | null>(null);
    
    const domNode = useClickOutside(() => setOpenMenu(false));

    const handleDialog = (action: string) => {
        switch (action) {
            case 'CreateRepairOpen':
                setOpenMenu(false);
                setCreateRepairOpen();
                break;
            case 'CreateRepairClose':
                setCreateRepairClose()
                break;
            case 'ArchiveVehicleOpen':
                setOpenMenu(false);
                setArchiveDialogOpen();
                break;
            case 'ArchiveVehicleClose':
                setArchiveDialogClose();
                break;
            case 'ArchiveVehicleCloseAndOpenMenu':
                setArchiveDialogClose();
                setOpenMenu(true);
                break;
            case 'MarkForSaleVehicleOpen':
                setOpenMenu(false);
                setMarkForSaleDialogOpen();
                break;
            case 'MarkForSaleVehicleClose':
                setMarkForSaleDialogClose();
                setActiveVehicle(null);
                break;
            case 'MarkForSaleVehicleCloseAndOpenMenu':
                setMarkForSaleDialogClose();
                setOpenMenu(true);
                break;
            case 'CleanUp':
                setActiveVehicle(null);
                setVehicleSelected(false);
                break;
            default:
                break;
        }
    };

    if (!currentUser || loading) return <UnauthorizeTopBar title={title} />;
    
    const { currentUserVehicles: userVehicles } = data;
    
    return (
        <>
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
                            handleDialog={handleDialog}
                        />
                    }
                </SideBar>
                <FooterBar 
                    setOpenMenu={setOpenMenu}
                    openMenu={openMenu} 
                    currentUser={currentUser} 
                    unauthorize={unauthorize}
                />
                <TopBar 
                    title={title} 
                    menuHandler={setOpenMenu}
                />
            </div>

            {/* Dialogs Container */}

            <DialogCreateRepairEntry label={"Create Repair Entry"}>
                <RepairCreateAndUpdateForm 
                    activeVehicle={activeVehicle} 
                    onDialogClose={() => handleDialog('CreateRepairClose')} 
                />
            </DialogCreateRepairEntry>
            <DialogMarkForSaleVehicle label={"Mark this vehicle for sale"}>
                <VehicleMarkForSaleAction 
                    vehicleId={activeVehicle?.id}
                    onClose={() => handleDialog('MarkForSaleVehicleCloseAndOpenMenu')} 
                    callback={() => handleDialog('MarkForSaleVehicleClose')} 
                />
            </DialogMarkForSaleVehicle>
            <DialogArchiveVehicle label={"Archive the vehicle"}>
                <div className="px-4 py-8 flex flex-col justify-center items-center gap-8">
                    <h1 className="text-gray-200 text-lg font-normal text-center">
                        Are you sure you want to archive a vehicle with the VIN number 
                        <span className="text-greenish-light text-lg font-semibold">
                            {activeVehicle?.vin}
                        </span>
                        ?
                    </h1>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <button 
                            type="button" 
                            children="Cancel" 
                            onClick={() => handleDialog('ArchiveVehicleCloseAndOpenMenu')}
                            className="px-6 py-2 text-gray-100 bg-gray-800 border-gray-800 transition ease-in duration-200 uppercase rounded-2xl font-normal hover:bg-transparent hover:border-gray-800 border-2  focus:outline-none"
                        />
                        <VehicleArchiveButton 
                            text="Archive this vehicle"
                            vehicleId={activeVehicle?.id} 
                            callback={() => handleDialog('ArchiveVehicleClose')}
                            className="px-6 py-2 text-gray-200 bg-danger-dark border-2 border-danger-dark transition ease-in duration-200 uppercase rounded-2xl shadow-2xl font-semibold hover:bg-transparent hover:text-danger-light focus:outline-none"
                        />
                    </div>
                </div>
            </DialogArchiveVehicle>
        </>
    );
};