import { useQuery } from '@apollo/client';
import { 
    GET_ALL_WORKSHOPS,
    GET_CURRENT_USER_VEHICLE,
    GET_VEHICLES_MARKED_FOR_SALE 
} from '../api/queries';
import { CurrentUserVehiclesCarousel } from '../components/Dashboard/CurrentUserVehiclesCarousel';
import { VehiclesForSaleCarousel } from '../components/Dashboard/VehiclesForSaleCarousel';
import { WorkshopsCarousel } from '../components/Dashboard/WorkshopsCarousel';
import { Menu } from '../components/Menu';
import { IVehicle } from '../models/vehicle';
import { IWorkshop } from '../models/workshop';
import { LoadingWithSpinnerAndTimeout } from '../utils/LoadingWithSpinnerAndTimeout';

import useDocumentTitle from '../hooks/useDocumentTitle';
import Toast from '../utils/Toast';

export const DashboardPage = () => {
    useDocumentTitle('Dashboard | Reparify');
    const {
        loading: currentUserVehicleLoading,
        error: currentUserVehicleError,
        data: currentUserVehicleData
    } = useQuery<{ currentUserVehicles: IVehicle[] }>(GET_CURRENT_USER_VEHICLE, {
        onError: error => Toast("error", error.message),
        errorPolicy: "all",
    });

    const {
        loading: vehicleForSaleLoading,
        error: vehicleForSaleError,
        data: vehicleForSaleData
    } = useQuery<{ vehicleForSale: IVehicle[] }>(GET_VEHICLES_MARKED_FOR_SALE, {
        onError: error => Toast("error", error.message),
        errorPolicy: "all",
    });
    
    const {
        loading: workshopLoading,
        error: workshopError,
        data: workshopData
    } = useQuery<{ workshops: IWorkshop[] }>(GET_ALL_WORKSHOPS, {
        onError: error => Toast("error", error.message),
        errorPolicy: "all",
    });

    if (currentUserVehicleLoading || 
        vehicleForSaleLoading || 
        workshopLoading
    ) return <LoadingWithSpinnerAndTimeout />

    return (
        <div className="mb-12">
            <Menu title="Dashboard" />
            <CurrentUserVehiclesCarousel
                error={currentUserVehicleError}
                currentUserVehicles={currentUserVehicleData?.currentUserVehicles}
            />
            <VehiclesForSaleCarousel
                error={vehicleForSaleError}
                vehicleForSale={vehicleForSaleData?.vehicleForSale}
            />
            <WorkshopsCarousel
                error={workshopError}
                workshops={workshopData?.workshops}
            />
        </div>
    );
};