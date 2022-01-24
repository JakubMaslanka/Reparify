import { useMutation } from '@apollo/client';
import { ARCHIVE_EXIST_VEHICLE } from '../../../api/mutations';

import { LoadingButton } from '../../../utils/LoadingButton';
import Toast from '../../../utils/Toast';

interface IVehicleArchiveButton { 
    vehicleId: string | undefined
    text: string
    className: string
    callback: () => void
}

export const VehicleArchiveButton: React.FC<IVehicleArchiveButton> = ({ 
    vehicleId, 
    text,
    className,
    callback
}) => {

    const [archiveVehicle, { loading, error }] = useMutation(ARCHIVE_EXIST_VEHICLE, {
        onCompleted: ({ archiveVehicle: { success, message }}) => {
            if (success) {
                Toast('success', message);
                callback();
            } else {
                Toast('error', message);
            }
        },
        onError: (error) => Toast('error', error.message),
    });
    
    const handleArchiveVehicle = () => {
        if (!!vehicleId) {
            archiveVehicle({ variables: { id: vehicleId } });
        } else {
            Toast('error', "Something went wrong with the recognition of the vehicle. Please try again later!");
        }
    }
    
    return (
        <>
            { !error || !vehicleId ? (
                <LoadingButton 
                    text={text}
                    condition={loading}
                    type={"button"}
                    className={className}
                    onClick={handleArchiveVehicle}
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