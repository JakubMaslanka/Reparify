import React from 'react';
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { IVehicle } from '../../models/vehicle';
import { VehicleCard } from './VehicleCard';
import { useNavigate } from 'react-router-dom';
import { BiCar } from 'react-icons/bi';
import { ApolloError } from '@apollo/client';
import { DashboardError } from './DashboardError';

interface CurrentUserVehiclesCarouselProps {
    currentUserVehicles: IVehicle[] | undefined
    error: ApolloError | undefined
}

export const CurrentUserVehiclesCarousel: React.FC<CurrentUserVehiclesCarouselProps> = ({
    currentUserVehicles,
    error
}) => {
    if (error) {
        return <DashboardError message={error.message} />
    };
    return (
        <>
            <div className="w-full text-gray-100 text-xl font-semibold px-4 mt-4">
                Your vehicles:
            </div>
            {currentUserVehicles!.length > 0 ? (
                <Carousel
                    plugins={[
                        'clickToChange',
                        {
                            resolve: slidesToShowPlugin,
                            options: {
                                numberOfSlides: 2
                            }
                        },
                    ]}
                    itemWidth={275}
                >
                    {currentUserVehicles!.map((vehicle: IVehicle) => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                </Carousel>
            ) : <CurrentUserVehiclesEmptyState />}
        </>
    );
};


const CurrentUserVehiclesEmptyState = () => {
    const navigate = useNavigate();
    return (
        <div className="px-4 mt-4 text-center">
            <div className="w-full flex flex-col justify-center items-center gap-8 bg-gray-800 rounded-xl shadow-xl p-4">
                <p className="text-gray-200 text-lg font-semibold">
                    It looks like you don't own any vehicles...
                </p>
                <div
                    onClick={() => navigate('/vehicle/add')}
                    className="flex items-center gap-2 border-2 rounded-full border-greenish-dark hover:bg-greenish-dark text-greenish-light hover:text-gray-800 text-lg font-medium px-4 py-2 cursor-pointer"
                >
                    <BiCar />Add vehicle!
                </div>
            </div>
        </div>
    );
};