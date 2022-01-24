import { useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { VehicleMenuButton } from './VehicleMenuButton';
import { AdminActions } from '../../utils/AdminActions';

import { BiAddToQueue } from 'react-icons/bi';
import { MdOutlineArchive } from 'react-icons/md';
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import { HiOutlineClipboardCopy, HiOutlineDotsHorizontal } from "react-icons/hi";

import { IVehicle } from '../../models/vehicle';

import Toast from '../../utils/Toast';

interface VehicleMenuProps {
    currentVehicle: IVehicle;
    isOwner: boolean;
    openDialog: (arg: string) => void;
};

export const VehicleMenu: React.FC<VehicleMenuProps> = ({
    currentVehicle, isOwner, openDialog
}) => {
    const navigate = useNavigate();
    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button>
                <HiOutlineDotsHorizontal color="#FAFAFA" size="1.8rem" />
            </Menu.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white-500 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                        <Menu.Item>
                            <VehicleMenuButton
                                onClick={() => window.navigator.clipboard.writeText(window.location.href)}
                                icon={<HiOutlineClipboardCopy size={"1.25rem"} color="#2F3136" />}
                                text={"Copy vehicle URL"} />
                        </Menu.Item>
                        <hr />
                        <AdminActions otherCondition={isOwner}>
                            <>
                                {!currentVehicle.isArchived && (
                                    <Menu.Item>
                                        <VehicleMenuButton
                                            onClick={() => navigate(`/vehicle/${currentVehicle.id}/edit`)}
                                            icon={<RiEditLine size={"1.25rem"} color="#2F3136" />}
                                            text={"Edit this vehicle"} />
                                    </Menu.Item>
                                )}
                                {!currentVehicle.isArchived && (
                                    <Menu.Item>
                                        <VehicleMenuButton
                                            onClick={() => openDialog("CreateRepair")}
                                            icon={<BiAddToQueue size={"1.25rem"} color="#2F3136" />}
                                            text={"Add repair entry"} />
                                    </Menu.Item>
                                )}
                                {!currentVehicle.isArchived && (
                                    <Menu.Item>
                                        <VehicleMenuButton
                                            onClick={() => !currentVehicle.isMarkedForSale ? openDialog("ArchiveVehicle") : Toast("info", "You've to get rid of the car-for-sale marker in the first place, to archive it.")}
                                            icon={<MdOutlineArchive size={"1.25rem"} color="#2F3136" />}
                                            text={"Archive this vehicle"} />
                                    </Menu.Item>
                                )}
                                <Menu.Item>
                                    <VehicleMenuButton
                                        onClick={() => openDialog("RemoveVehicle")}
                                        icon={<RiDeleteBinLine size={"1.25rem"} color="#2F3136" />}
                                        text={"Remove this vehicle"} />
                                </Menu.Item>
                            </>
                        </AdminActions>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};
