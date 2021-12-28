import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom'
import { GET_SINGLE_VEHICLE } from '../api/queries';
import { VehicleDetails } from '../components/Vehicle/VehicleDetails';
import { LoadingSpinner } from '../utils/LoadingSpinner';

export const SingleVehiclePage = () => {
    const { id: VehicleId } = useParams();
    const { loading, error, data } = useQuery(GET_SINGLE_VEHICLE, {
        variables: {
            VehicleId
        },
        onError: (error) => {
            console.log(error.message);
        },
        errorPolicy: "all",
    });
    if (loading) {
        return <LoadingSpinner />
    } else if (error) {
        return <p>Vehicle not found, sorry... 😥</p>
    }
    const { vehicle } = data!;

    return <VehicleDetails vehicle={vehicle}/>
}
