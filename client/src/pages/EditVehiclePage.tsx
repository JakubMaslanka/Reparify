import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_EXIST_VEHICLE } from '../api/mutations';
import { GET_SINGLE_VEHICLE } from '../api/queries';
import { useNavigate, useParams } from 'react-router-dom';
import { Menu } from '../components/Menu';
import { VehicleCreateAndUpdateForm } from '../components/Vehicle/mutations/VehicleCreateAndUpdateForm';

import { ErrorBoundaryWithMessage } from '../utils/ErrorBoundaryWithMessage';
import { LoadingWithSpinnerAndTimeout } from '../utils/LoadingWithSpinnerAndTimeout';

import useDocumentTitle from '../hooks/useDocumentTitle';
import Toast from '../utils/Toast';

export const EditVehiclePage = () => {
    const navigate = useNavigate();
    const { id: VehicleId } = useParams();
    
    const [
        updateVehicle, 
        { 
            loading: updateMutationLoading,
            error: updateMutationError
        }
    ] = useMutation(UPDATE_EXIST_VEHICLE, {
        onCompleted: ({ editVehicle: { success, vehicle, message }}) => {
            if (success) {
                navigate(`/vehicle/${vehicle.id}`)
                Toast('success', message)
            } else {
                Toast('error', message)
            }
        },
        onError: error => Toast('error', error.message)
    });

    const {
        data: singleVehicleData, 
        loading: singleVehicleLoading, 
        error: singleVehicleError
    } = useQuery(GET_SINGLE_VEHICLE, {
        variables: {
            VehicleId
        },
        onError: error => Toast('error', error.message),
        errorPolicy: "all"
    });

    useDocumentTitle(`${!!singleVehicleData ? `Edit a ${singleVehicleData.vehicle.mark} ${singleVehicleData.vehicle.model} | Reparify` : 'Edit a vehicle | Reparify'}`);
    
    if (updateMutationLoading || singleVehicleLoading) {
        return <LoadingWithSpinnerAndTimeout />
    } else if (updateMutationError || singleVehicleError) {
        return <ErrorBoundaryWithMessage title='Edit a vehicle' message='An error occurred while processing your request... 😥' />
    };

    const { vehicle } = singleVehicleData!;
    
    const onCancel = () => {
        navigate('/dashboard')
    };

    const onSubmit = (formData: any) => {
        delete formData.vin;
        delete formData.mileage;
        updateVehicle({ variables: { id: vehicle.id, formData } })
    };

    return (
        <>
            <Menu title="Edit your vehicle"/>
            <VehicleCreateAndUpdateForm
                onSubmit={onSubmit}
                onCancel={onCancel}
                onLoading={singleVehicleLoading || updateMutationLoading}
                vehicle={vehicle}
            />
        </>
    )
};
