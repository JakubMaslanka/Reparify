import '@brainhubeu/react-carousel/lib/style.css';
import 'react-vertical-timeline-component/style.min.css';
import React, { useState } from 'react'
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import { useNavigate } from 'react-router-dom';
import { VerticalTimeline }  from 'react-vertical-timeline-component';
import { RepairCreateAndUpdateForm } from './mutations/RepairCreateAndUpdateForm';
import { RepairDeleteButton } from './mutations/RepairDeleteButton';
import { VehicleArchiveButton } from './mutations/VehicleArchiveButton';
import { VehicleDeleteButton } from './mutations/VehicleDeleteButton';
import { RepairListItem } from './RepairListItem';
import { VehicleMenu } from './VehicleMenu';

import { HiOutlineChevronLeft } from "react-icons/hi";
import { MdOutlinePhotoCamera } from 'react-icons/md';
import { RiMailSendLine } from "react-icons/ri";

import { IVehicle } from '../../models/vehicle';
import { IRepair } from '../../models/repair';

import useDialog from '../../hooks/useDialog';

interface VehicleProps {
    vehicle: IVehicle
    isOwner: boolean
};

export const VehicleDetails: React.FC<VehicleProps> = ({ vehicle, isOwner }) => {
    const { 
        setDialogClose: setCreateRepairClose,
        setDialogOpen: setCreateRepairOpen,
        DialogContainer: DialogCreateRepairEntry
    } = useDialog();
    const {
        setDialogClose: setArchiveVehicleClose,
        setDialogOpen: setArchiveVehicleOpen,
        DialogContainer: DialogArchiveVehicle
    } = useDialog();
    const {
        setDialogClose: setRemoveVehicleClose,
        setDialogOpen: setRemoveVehicleOpen,
        DialogContainer: DialogRemoveVehicle
    } = useDialog();
    const {
        setDialogClose: setEditRepairClose,
        setDialogOpen: setEditRepairOpen,
        DialogContainer: DialogEditRepairEntry
    } = useDialog();
    const {
        setDialogClose: setDeleteRepairClose,
        setDialogOpen: setDeleteRepairOpen,
        DialogContainer: DialogDeleteRepairEntry
    } = useDialog();
    
    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const [activeRepair, setActiveRepair] = useState<IRepair | null>(null);
    
    const handleOpenVehicleDialog = (dialogName: string) => {
        switch (dialogName) {
            case 'CreateRepair':
                return setCreateRepairOpen();
            case 'ArchiveVehicle':
                return setArchiveVehicleOpen();
            case 'RemoveVehicle':
                return setRemoveVehicleOpen();
            case 'EditRepair':
                return setEditRepairOpen();
            case 'DeleteRepair':
                return setDeleteRepairOpen();
            default:
                break;
        };
    };

    const handleOpenRepairDialog = (repairState: IRepair, dialogName: string) => {
        setActiveRepair(repairState);
        switch (dialogName) {
            case 'EditRepair':
                return setEditRepairOpen();
            case 'DeleteRepair':
                return setDeleteRepairOpen();
            default:
                break;
        };
    };

    const handleCloseAllDialogs = () => {
        setCreateRepairClose();
        setArchiveVehicleClose();
        setRemoveVehicleClose();
        setEditRepairClose();
        setDeleteRepairClose();
        setActiveRepair(null);
    };

    const vehiclePicturesAsSlides = vehicle.photos
        .filter((pic: string) => pic !== null)
        .map((pic: string, idx: number) => (
        <>
            {!!vehicle.isArchived && idx === 0 ? (
                <>
                    <img key={pic} className="mx-auto object-cover object-center h-full md:h-128 blur-sm" src={pic} alt={`Vehicle_Picture_Num_${idx}`}/>
                    <div className="absolute top-0 w-full h-full flex flex-col items-center justify-center gap-2 text-white-500">
                        <MdOutlinePhotoCamera size="3rem" color="#4FDC7C" />
                        <p className="text-xl font-bold text-greenish-light uppercase">This vehicle is archived</p>
                        <p className="text-md font-light text-white-500 -mt-2">Vehicle information may be out of date</p>
                        {isOwner && (
                            <VehicleArchiveButton text="Unarchive this vehicle" className="px-6 py-2 text-gray-200 bg-greenish-dark border-2 border-greenish-dark transition ease-in duration-200 uppercase rounded-2xl shadow-2xl font-semibold hover:bg-transparent hover:text-greenish-light z-50 focus:outline-none" vehicleId={vehicle.id} callback={handleCloseAllDialogs} />
                        )}
                    </div>
                    <div className="absolute top-0 w-full h-full z-30 bg-gradient-to-t from-gray-800 via-transparent to-transparent"></div>
                </>
            ) : (
                <>
                    <img key={pic} className="mx-auto object-cover object-center h-full md:h-128" src={pic} alt={`Vehicle_Picture_Num_${idx}`}/>
                    <div className="absolute top-0 w-full h-full z-20 bg-gradient-to-t from-gray-800 via-transparent to-transparent"></div>
                </>
            )}
        </>
    ));

    return (
        <div className="max-w-5xl mx-auto">
            <div className="block relative h-10/12 md:h-128 bg-gray-900">
                <div className="z-20 flex flex-row items-center justify-between absolute top-0 px-4 py-6 w-full">
                    <HiOutlineChevronLeft onClick={() => navigate('/dashboard')} color="#FAFAFA" size="1.8rem" />
                    <VehicleMenu currentVehicle={vehicle} isOwner={isOwner} openDialog={handleOpenVehicleDialog}/>
                </div>
                <Carousel
                    className="block relative h-full md:h-128"
                    value={value}
                    slides={vehiclePicturesAsSlides}
                    onChange={(value) => setValue(value)}
                />
                <Dots className="absolute w-full bottom-0 mx-auto mb-4" value={value} onChange={(value) => setValue(value)} number={vehiclePicturesAsSlides.length} />
            </div>
            <div className="flex flex-col m-4">
                <p className="text-white-500 text-2xl font-medium uppercase">
                    {`${vehicle.mark} ${vehicle.model}`}
                </p>
                <div className="relative text-white-500">
                    <span className="text-xs font-extralight uppercase">
                        Year: 
                    </span>
                    <span className="text-xs ml-1 font-medium uppercase">
                        {vehicle.productionYear}
                    </span><br/>
                    <div className="-mt-2">
                        <span className="text-xs font-extralight uppercase">
                            Power: 
                        </span>
                        <span className="text-xs ml-1 font-medium uppercase">
                            {vehicle.power} hp
                        </span>
                    </div>
                    {!!vehicle.isArchived && 
                        <p className="absolute top-0 right-0 bg-danger-dark text-sm text-center uppercase font-light py-1 px-2 rounded-full shadow-2xl">
                            vehicle archived!
                        </p>
                    }
                </div>
                {!!vehicle.isMarkedForSale && (
                    <div className="flex flex-row items-end justify-between mt-4">
                        <div>
                            <p className="text-gray-300 text-sm font-semibold">
                                Vehicle is for sale, price:
                            </p>
                            <p className="text-greenish-light text-2xl font-semibold">
                                {vehicle.price!.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                            </p>
                        </div>
                        <div>
                            <a className="flex flex-row items-center justify-between gap-4 bg-greenish-light hover:bg-greenish-dark px-3 py-1 shadow-2xl rounded-full uppercase text-sm font-semibold text-white-500 transition ease-in duration-200" href={`mailto:${vehicle.owner.email}`}>
                                Send mail <RiMailSendLine size="1.25rem" />
                            </a>
                        </div>
                    </div>
                )}
            </div>
            <hr className="border-greenish-light mx-4" />
            <div className="flex flex-col justify-between items-center my-2 mx-6">
                <VehicleInfoLabel title="Mileage" value={`${vehicle.mileage.toLocaleString()} km`} />
                <VehicleInfoLabel title="Body Type" value={vehicle.bodyType} />
                <VehicleInfoLabel title="Fuel Type" value={vehicle.fuelType} />
                <VehicleInfoLabel title="Year" value={vehicle.productionYear.toString()} />
                <VehicleInfoLabel title="Power" value={`${vehicle.power} hp`} />
                <VehicleInfoLabel title="Transmission" value={vehicle.transmission} />
                <VehicleInfoLabel title="Technical Review Expire" value={new Date(vehicle.techReviewExpDate).toLocaleDateString('en-GB')} />
                <VehicleInfoLabel title="Insurance Expire" value={new Date(vehicle.insuranceExpDate).toLocaleDateString('en-GB')} />
                <VehicleInfoLabel title="VIN" value={vehicle.vin} />
            </div>
            <hr className="border-greenish-light mx-4 my-4" />
            <p className="text-gray-200 text-center text-xl font-medium uppercase my-8">
                Repair history:
            </p>
            {
                vehicle.repairList.length > 0 ? (
                    <VerticalTimeline className="my-8">
                        {vehicle.repairList.map((repair: IRepair) => (
                            <RepairListItem 
                                key={repair._id} 
                                repair={repair}
                                isOwner={isOwner} 
                                currentVehicle={vehicle} 
                                openDialog={handleOpenRepairDialog} 
                            />
                        ))}
                    </VerticalTimeline>
                ) : (
                    <p className="text-gray-200 text-center text-lg font-semibold uppercase my-8 px-2 hover:underline hover:text-greenish-dark transition ease-in duration-200">Unfortunately, the owner of the vehicle hasn't provided any service entries.</p>
                )
            }

            {/* Dialogs Container */}
            
            <DialogCreateRepairEntry label={"Create Repair Entry"}>
                <RepairCreateAndUpdateForm activeVehicle={vehicle} onDialogClose={handleCloseAllDialogs} />
            </DialogCreateRepairEntry>
            <DialogEditRepairEntry label={"Edit Repair Entry"}>
                <RepairCreateAndUpdateForm activeVehicle={vehicle} updateMode={activeRepair} onDialogClose={handleCloseAllDialogs} />
            </DialogEditRepairEntry>
            <DialogDeleteRepairEntry label={"Remove Repair Entry"}>
                <div className="px-4 py-8 flex flex-col justify-center items-center gap-8">
                    <h1 className="text-gray-200 text-lg font-normal text-center">
                        Are you sure you want to permanently remove the repair entry from <br/>
                        <span className="text-greenish-light text-lg font-semibold">{activeRepair?.createdAt}</span>
                        ?
                    </h1>
                    <RepairDeleteButton vehicleId={vehicle.id} repairId={activeRepair?._id} callback={handleCloseAllDialogs} />
                </div>
            </DialogDeleteRepairEntry>
            <DialogArchiveVehicle label={"Archive the vehicle"}>
                <div className="px-4 py-8 flex flex-col justify-center items-center gap-8">
                    <h1 className="text-gray-200 text-lg font-normal text-center">Are you sure you want to archive a vehicle with the VIN number <span className="text-greenish-light text-lg font-semibold">{vehicle?.vin}</span>?</h1>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <button type="button" children="Cancel" onClick={handleCloseAllDialogs} className="px-6 py-2 text-gray-100 bg-gray-800 border-gray-800 transition ease-in duration-200 uppercase rounded-2xl font-normal hover:bg-transparent hover:border-gray-800 border-2  focus:outline-none" />
                        <VehicleArchiveButton text="Archive this vehicle" className="px-6 py-2 text-gray-200 bg-danger-dark border-2 border-danger-dark transition ease-in duration-200 uppercase rounded-2xl shadow-2xl font-semibold hover:bg-transparent hover:text-danger-light focus:outline-none" vehicleId={vehicle.id} callback={handleCloseAllDialogs} />
                    </div>
                </div>
            </DialogArchiveVehicle>
            <DialogRemoveVehicle label={"Remove the vehicle permanently"}>
                <div className="px-4 py-8 flex flex-col justify-center items-center gap-8">
                    <h1 className="text-gray-200 text-lg font-normal text-center">Are you sure you want to permanently remove the vehicle?</h1>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <button type="button" children="Cancel" onClick={handleCloseAllDialogs} className="px-6 py-2 text-gray-100 bg-gray-800 border-gray-800 transition ease-in duration-200 uppercase rounded-2xl font-normal hover:bg-transparent hover:border-gray-800 border-2  focus:outline-none" />
                        <VehicleDeleteButton vehicleId={vehicle.id} callback={handleCloseAllDialogs} />
                    </div>
                </div>
            </DialogRemoveVehicle>
        </div>
    );
};

interface VehicleInfoLabelProps {
    title: string
    value: string
};

const VehicleInfoLabel: React.FC<VehicleInfoLabelProps> = ({
    title,
    value
}) => (
    <div className="flex w-full  flex-row justify-between items-center">
        <div className="text-gray-400 text-lg font-extralight">{title}:</div>
        <div className="text-gray-200 text-xl font-normal">{value}</div>
    </div>
);