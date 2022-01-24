import { useMutation } from '@apollo/client';
import { GET_SINGLE_VEHICLE } from '../../../api/queries';
import { DELETE_EXIST_REPAIR_ENTRY } from '../../../api/mutations';

import { LoadingButton } from '../../../utils/LoadingButton';
import Toast from '../../../utils/Toast';

interface IRepairDeleteButton {
    vehicleId: string
    repairId: string | undefined
    callback: () => void
};

export const RepairDeleteButton: React.FC<IRepairDeleteButton> = ({ 
    vehicleId,
    repairId,
    callback
}) => {

    const [
        deleteRepairEntry,
        { 
            loading,
            error 
        }
    ] = useMutation(DELETE_EXIST_REPAIR_ENTRY, {
        onCompleted: ({ removeRepair: { success, message }}) => {
            if (success) {
                Toast('success', message);
                callback();
            } else {
                Toast('error', message);
            }
        },
        onError: (error) => Toast('error', error.message),
        update: (cache, { data: { removeRepair: { vehicle }} }) => {
            try {
                const cachedData = cache.readQuery({
                    query: GET_SINGLE_VEHICLE,
                    variables: { VehicleId: vehicle.id }
                })
                const copyOfCache = JSON.parse(JSON.stringify(cachedData));
                cache.writeQuery({
                    query: GET_SINGLE_VEHICLE,
                    variables: { VehicleId: vehicle.id },
                    data: copyOfCache
                })
            } catch (error) {
                Toast('error', error as string);
            }
        }
    });
    
    const handleDeleteEntry = () => {
        if (!!vehicleId || !!repairId) {
            deleteRepairEntry({ variables: { repairID: repairId, id: vehicleId } })
        } else {
            Toast('error', "Something went wrong with the recognition of the repair entry. Please try again later!");
        }
    }

    return (
        <>
            { !error ? (
                <LoadingButton 
                    text='Delete repair entry'
                    condition={loading}
                    type={"button"}
                    className="px-6 py-2 text-gray-200 bg-danger-dark border-2 border-danger-dark transition ease-in duration-200 uppercase rounded-2xl shadow-2xl font-semibold hover:bg-transparent hover:text-danger-light focus:outline-none"
                    onClick={handleDeleteEntry}
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
