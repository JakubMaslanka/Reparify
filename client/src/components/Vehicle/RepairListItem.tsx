import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import { Menu, Transition } from '@headlessui/react';
import { VehicleMenuButton } from "./VehicleMenuButton";
import { RepairListItemDetails } from './RepairListItemDetails';
import { AdminActions } from '../../utils/AdminActions';

import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";
import { MdPlaylistAdd } from 'react-icons/md';
import { HiOutlineDotsVertical } from "react-icons/hi";

import { IRepair } from '../../models/repair';
import { IVehicle } from '../../models/vehicle';

interface RepairListItemProps {
    repair: IRepair;
    isOwner: boolean;
    currentVehicle: IVehicle;
    openDialog: (repairState: IRepair, dialogName: string) => void;
};

export const RepairListItem: React.FC<RepairListItemProps> = ({
    repair,
    isOwner,
    currentVehicle,
    openDialog
}) => (
    <VerticalTimelineElement
        className="vertical-timeline-element--work relative"
        date={repair.createdAt}
        iconStyle={{ background: "rgb(79, 220, 124)", color: "#fff" }}
        icon={<MdPlaylistAdd />}
    >
        {!!repair.updatedAt && <span className="absolute right-1 top-0 p-1 -mt-2 text-xs font-semibold text-white-500 bg-greenish-light rounded-2xl">
            Updated at: {repair.updatedAt}
        </span>}
        <div className="flex flex-row justify-between items-center mt-2">
            <h3 className="text-md font-semibold">
                {repair.workshop}
            </h3>
            <AdminActions otherCondition={isOwner && !currentVehicle.isArchived}>
                <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button>
                        <HiOutlineDotsVertical size="1.2rem" />
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
                                        onClick={() => openDialog(repair, 'EditRepair')}
                                        icon={<RiEditLine size={"1.25rem"} color="#2F3136" />}
                                        text={"Edit repair entry"} />
                                </Menu.Item>
                                <Menu.Item>
                                    <VehicleMenuButton
                                        onClick={() => openDialog(repair, 'DeleteRepair')}
                                        icon={<RiDeleteBinLine size={"1.25rem"} color="#2F3136" />}
                                        text={"Remove repair entry"} />
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </AdminActions>
        </div>
        <h3 className="text-sm font-semibold text-gray-400 -mt-1">
            at: {repair.mileage} km
        </h3>
        <div className="px-0 py-4">
            <span className="text-gray-400 text-sm">
                Description:
            </span>
            <p className="m-0 px-2 text-sm font-medium text-gray-600">
                {repair.description}
            </p>
        </div>
        <RepairListItemDetails repair={repair} />
    </VerticalTimelineElement>
);
