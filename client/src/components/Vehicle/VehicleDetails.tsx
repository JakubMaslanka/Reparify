import React, { useState } from 'react'
import { Vehicle } from '../../models/vehicle';
import { HiOutlineChevronLeft, HiOutlineDotsHorizontal } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react'
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

interface VehicleProps {
    vehicle: Vehicle
};

export const VehicleDetails: React.FC<VehicleProps> = ({vehicle}) => {
    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const slides = vehicle.photos.map((pic: string) => (
        <>
            <img key={pic} className="mx-auto object-cover object-center h-full" src={pic} alt='pic'/>
            <div className="absolute top-0 w-full h-full bg-gradient-to-t from-gray-800 via-transparent to-transparent"></div>
        </>
    ));

    return (
        <div>
            <div className="block relative h-full bg-gray-900">
                <div className="flex flex-row items-center justify-between absolute top-0 px-4 py-6 w-full z-50">
                    <HiOutlineChevronLeft onClick={() => navigate(-1)} color="#FAFAFA" size="1.8rem" />
                    <DropdownMenu vehicleId={vehicle.id}/>
                </div>
                <Carousel
                    value={value}
                    slides={slides}
                    onChange={(value) => setValue(value)}
                />
                <Dots className="absolute w-full bottom-0 mx-auto mb-4" value={value} onChange={(value) => setValue(value)} number={slides.length} />
            </div>
            <div className="flex flex-col m-4">
                <p className="text-white-500 text-2xl font-medium uppercase">{`${vehicle.mark} ${vehicle.model}`}</p>
                <div className="text-white-500">
                    <span className="text-xs font-extralight uppercase">Year: </span><span className="text-xs font-medium uppercase">{vehicle.productionYear}</span><br/>
                    <div className="-mt-2">
                        <span className="text-xs font-extralight uppercase">Power: </span><span className="text-xs font-medium uppercase">{vehicle.power} KM</span>
                    </div>
                </div>
            </div>
            <hr className="border-greenish-light mx-4" />
            <div className="flex flex-col justify-between items-center my-2 mx-6">
                <VehicleInfo title="Mileage" value={`${vehicle.mileage.toLocaleString()} km`} />
                <VehicleInfo title="Body Type" value={vehicle.bodyType} />
                <VehicleInfo title="Fuel Type" value={vehicle.fuelType} />
                <VehicleInfo title="Year" value={vehicle.productionYear.toString()} />
                <VehicleInfo title="Power" value={vehicle.power.toString()} />
                <VehicleInfo title="Transmission" value={vehicle.transmission} />
                <VehicleInfo title="Technical Review Expire" value={new Date(vehicle.techReviewExpDate).toLocaleDateString()} />
                <VehicleInfo title="Insurance Expire" value={new Date(vehicle.insuranceExpDate).toLocaleDateString()} />
                <VehicleInfo title="VIN" value={vehicle.vin} />
            </div>
            <hr className="border-greenish-light mx-4 my-4" />
            <p className="text-gray-200 text-center text-xl font-medium uppercase mt-8">Repair history:</p>
            <VerticalTimeline className="my-8">
                {vehicle.repairList.map((event: any) => (
                <VerticalTimelineElement
                    key={event.createdAt}
                    className="vertical-timeline-element--work"
                    date={event.createdAt}
                    iconStyle={{ background: "rgb(79, 220, 124)", color: "#fff" }}
                >
                    <p className="vertical-timeline-element-title">
                        {event.description}
                    </p>
                </VerticalTimelineElement>
                ))}
            </VerticalTimeline>
        </div>
    );
};

const VehicleInfo: React.FC<{title: string, value: string}> = ({title, value}) => (
    <div className="flex w-full  flex-row justify-between items-center">
        <div className="text-gray-400 text-lg font-extralight">{title}:</div>
        <div className="text-gray-200 text-xl font-normal">{value}</div>
    </div>
);

const DropdownMenu: React.FC<{vehicleId: string}> = ({vehicleId}) => {
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
                            {({ active }) => (
                            <button
                                onClick={() => navigate(`/vehicle/${vehicleId}/add-repair`)}
                                className={`${
                                active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm hover:bg-white-600 transition-all ease-linear duration-100`}
                            >
                                Add service entry
                            </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                            <button
                                onClick={() => navigate(`/vehicle/${vehicleId}/edit`)}
                                className={`${
                                active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm hover:bg-white-600 transition-all ease-linear duration-100`}
                            >
                                Edit this vehicle
                            </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                            <button
                                onClick={() => navigate(`/vehicle/${vehicleId}/delete`)}
                                className={`${
                                active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm hover:bg-white-600 transition-all ease-linear duration-100`}
                            >
                                Archive this vehicle
                            </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};