import { useQuery } from '@apollo/client';
import { GET_SINGLE_VEHICLE } from '../api/queries';
import { useParams } from 'react-router-dom'
import { VehicleDetails } from '../components/Vehicle';
import { useAuth } from '../utils/AuthProvider';
import { ErrorBoundaryWithMessage } from '../utils/ErrorBoundaryWithMessage';
import { LoadingSpinner } from '../utils/LoadingSpinner';

import { IVehicle } from '../models/vehicle';

import useDocumentTitle from '../hooks/useDocumentTitle';
import Toast from '../utils/Toast';

export const SingleVehiclePage = () => {
    const { id: VehicleId } = useParams();
    const { currentUser } = useAuth();
    const {
        loading,
        error,
        data
    } = useQuery<{ vehicle: IVehicle }>(GET_SINGLE_VEHICLE, {
        variables: {
            VehicleId
        },
        onError: error => Toast('error', error.message),
        errorPolicy: "all",
    });
    useDocumentTitle(`${!!data?.vehicle ? `${data!.vehicle.mark} ${data!.vehicle.model} | Reparify` : 'Vehicle page | Reparify'}`);

    if (loading) {
        return <LoadingSpinner />
    } else if (error) {
        return <ErrorBoundaryWithMessage title='Vehicle page' message='Vehicle not found, sorry... 😥' />
    }
    const { vehicle } = data!;

    return <VehicleDetails vehicle={vehicle} isOwner={currentUser?.id === vehicle.owner.id} />
};

