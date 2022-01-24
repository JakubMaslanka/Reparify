import { useMutation } from '@apollo/client';
import { CREATE_NEW_VEHICLE } from '../api/mutations';
import { GET_CURRENT_USER_VEHICLE } from '../api/queries';
import { useNavigate } from 'react-router-dom';
import { Menu } from '../components/Menu';
import { VehicleCreateAndUpdateForm } from '../components/Vehicle/mutations/VehicleCreateAndUpdateForm';
import { LoadingWithSpinnerAndTimeout } from '../utils/LoadingWithSpinnerAndTimeout';
import { ErrorBoundaryWithMessage } from '../utils/ErrorBoundaryWithMessage';

import Toast from '../utils/Toast';
import useDocumentTitle from '../hooks/useDocumentTitle';

export const NewVehiclePage = (): JSX.Element => {
    useDocumentTitle('Add new vehicle | Reparify');
    const navigate = useNavigate();

    const [
        createNewVehicle, 
        { 
            loading, 
            error 
        }
    ] = useMutation(CREATE_NEW_VEHICLE, {
        onCompleted: ({ addVehicle: { success, vehicle, message }}) => {
            if (success) {
                navigate(`/vehicle/${vehicle.id}`)
                Toast('success', message)
            } else {
                Toast('error', message)
            }
        },
        onError: error => Toast('error', error.message),
        update: (cache, { data: { addVehicle: { vehicle } } }) => {
            try {
                const cachedData = cache.readQuery({
                    query: GET_CURRENT_USER_VEHICLE
                })
                const copyOfCache = JSON.parse(JSON.stringify(cachedData));
                copyOfCache.currentUserVehicles.push(vehicle);
                cache.writeQuery({
                    query: GET_CURRENT_USER_VEHICLE,
                    data: copyOfCache
                })
            } catch (error) {
                Toast('error', error as string)
            }
        }
    });
    if (loading) {
        return <LoadingWithSpinnerAndTimeout />
    } else if (error) {
        return <ErrorBoundaryWithMessage title='Add new vehicle' message='An error occurred while processing your request... 😥' />
    };

    const onCancel = () => {
        navigate('/dashboard')
    };

    return (
        <>
            <Menu title="Add new vehicle"/>
            <VehicleCreateAndUpdateForm
                onSubmit={formData => createNewVehicle({ variables: { formData } })}
                onCancel={onCancel}
                onLoading={loading}
            />
        </>
    );
};
