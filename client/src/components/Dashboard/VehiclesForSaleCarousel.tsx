import { ApolloError } from '@apollo/client';
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { IVehicle } from '../../models/vehicle';
import { DashboardError } from './DashboardError';
import { VehicleCard } from './VehicleCard';

interface VehiclesForSaleCarouselProps {
    vehicleForSale: IVehicle[] | undefined
    error: ApolloError | undefined
}

export const VehiclesForSaleCarousel: React.FC<VehiclesForSaleCarouselProps> = ({
    vehicleForSale,
    error
}) => {
    if (error) {
        return <DashboardError message={error.message} />
    };
    return (
        <>
            {vehicleForSale!.length > 0 && (
                <>
                    <div className="w-full text-gray-100 text-xl font-semibold px-4 mt-8">Vehicles for sale:</div>
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
                        {vehicleForSale!.map((vehicle: IVehicle) => (
                            <VehicleCard key={vehicle.id} vehicle={vehicle} withTags={false} />
                        ))}
                    </Carousel>
                </>
            )}
        </>
    );
};
