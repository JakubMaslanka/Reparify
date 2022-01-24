import { useMutation } from '@apollo/client';
import { GET_CURRENT_USER_VEHICLE } from '../../../api/queries';
import { DELETE_EXIST_VEHICLE } from '../../../api/mutations';
import { useNavigate } from 'react-router-dom';

import { IVehicle } from '../../../models/vehicle';

import { LoadingButton } from '../../../utils/LoadingButton';
import Toast from '../../../utils/Toast';

interface IVehicleDeleteButton {
    vehicleId: string
    callback: () => void
};

export const VehicleDeleteButton: React.FC<IVehicleDeleteButton> = ({ 
    vehicleId,
    callback 
}) => {
    const navigate = useNavigate();

    const [
        removeVehicle, 
        { 
            loading, 
            error 
        }
    ] = useMutation(DELETE_EXIST_VEHICLE, {
        onCompleted: ({ removeVehicle: { success, message }}) => {
            if (success) {
                Toast('success', message);
                navigate('/dashboard');
                callback();
            } else {
                Toast('error', message);
            }
        },
        onError: error => Toast('error', error.message),
        update: cache => {
            try {
                const cachedData = cache.readQuery({
                    query: GET_CURRENT_USER_VEHICLE
                })
                const copyOfCache = JSON.parse(JSON.stringify(cachedData));
                const indexOfRemovedVehicle = copyOfCache.currentUserVehicles.findIndex((vehicle: IVehicle) => vehicle.id === vehicleId);
                copyOfCache.currentUserVehicles.splice(indexOfRemovedVehicle, 1);
                cache.writeQuery({
                    query: GET_CURRENT_USER_VEHICLE,
                    data: copyOfCache
                })
            } catch (error) {
                Toast('error', error as string)
            }
        }
    });
    
    const handleRemoveVehicle = () => {
        if (!!vehicleId) {
            removeVehicle({ variables: { id: vehicleId } });
        } else {
            Toast('error', "Something went wrong with the recognition of the vehicle. Please try again later!");
        }
    }

    return (
        <>
            { !error || !vehicleId ? (
                <LoadingButton 
                    text='Remove this vehicle'
                    condition={loading}
                    type={"button"}
                    className="px-6 py-2 text-gray-200 bg-danger-dark border-2 border-danger-dark transition ease-in duration-200 uppercase rounded-2xl shadow-2xl font-semibold hover:bg-transparent hover:text-danger-light focus:outline-none"
                    onClick={handleRemoveVehicle}
                />
            ) : (
                <button 
                    type='button' 
                    disabled 
                    className="bg-danger-light text-gray-100 px-4 py-2 rounded-lg text-sm font-medium shadow-xl"
                >
                    An error occurred!<br/>Try again later.
                </button>
            )}
        </>
    )
};
