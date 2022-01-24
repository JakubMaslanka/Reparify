import React from 'react'
import { useMutation } from '@apollo/client';
import { MARK_FOR_SALE_VEHICLE } from '../../../api/mutations';
import { LoadingButton } from '../../../utils/LoadingButton';
import Toast from '../../../utils/Toast';
import { GET_VEHICLES_MARKED_FOR_SALE } from '../../../api/queries';
import { IVehicle } from '../../../models/vehicle';

interface IVehicleMarkForSaleAction { 
    vehicleId: string | undefined
    callback: () => void
    onClose: () => void 
};

export const VehicleMarkForSaleAction: React.FC<IVehicleMarkForSaleAction> = ({
    vehicleId,
    callback,
    onClose
}) => {
    const [
        markForSaleVehicle,
        {
            loading,
            error
        }
    ] = useMutation(MARK_FOR_SALE_VEHICLE, {
        onCompleted: ({ markVehicleForSale: { success, message }}) => {
            if (success) {
                callback();
                Toast('success', message);
            } else {
                Toast('error', message);
            }
        },
        onError: error => Toast('error', error.message),
        update: (cache, { data: { markVehicleForSale: { vehicle } } }) => {
            try {
                const cachedData = cache.readQuery({
                    query: GET_VEHICLES_MARKED_FOR_SALE
                })
                const copyOfCache = JSON.parse(JSON.stringify(cachedData));
                copyOfCache.vehicleForSale.push(vehicle)
                cache.writeQuery({
                    query: GET_VEHICLES_MARKED_FOR_SALE,
                    data: copyOfCache
                })
            } catch (error) {
                Toast('error', error as string)
            }
        }
    });
    const priceRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const handleMarkForSale = () => {
        if (!!vehicleId) {
            const price = !!priceRef.current.value ? parseInt(priceRef.current.value, 10) : 0;
            markForSaleVehicle({ variables: { id: vehicleId, price } });
        } else {
            Toast('error', "Something went wrong with the recognition of the vehicle. Please try again later!");
        }
    };

    return (
        <>
            { !error || !vehicleId ? (
                <div className="px-4 py-8 flex flex-col justify-center items-center gap-8">
                    <h1 className="text-gray-200 text-lg font-normal text-center">
                        Before putting the vehicle up for sale, you must enter a price. <br/>
                        Go for it!
                    </h1>
                    <div className="flex flex-row items-center gap-4">
                        <label className="text-lg font-medium text-gray-200" htmlFor="price">
                            Price:
                        </label>
                        <input ref={priceRef} type="number" min="1" step="any" placeholder="€" name="price"className="bg-gray-700 text-gray-400 py-1 px-2 border-1 rounded-lg shadow-2xl border-gray-900 font-medium outline-none focus:ring-2 focus:ring-greenish-light" />
                    </div>
                    <small className="text-gray-300 font-light text-center -mt-2">
                        * By marking a vehicle for sale, you agree to share your email address with other users of the application, so that they can contact with you.
                    </small>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <button type="button" children="Cancel" onClick={onClose} className="px-6 py-2 text-gray-100 bg-gray-800 border-gray-800 transition ease-in duration-200 uppercase rounded-2xl font-normal hover:bg-transparent hover:border-gray-800 border-2  focus:outline-none" />
                        <LoadingButton 
                            text='Mark for sale!'
                            condition={loading}
                            type={"button"}
                            className="px-6 py-2 text-gray-200 bg-greenish-dark border-2 border-greenish-dark transition ease-in duration-200 uppercase rounded-2xl shadow-2xl font-semibold hover:bg-transparent hover:text-greenish-light focus:outline-none"
                            onClick={handleMarkForSale}
                        />
                    </div>
                </div>
            ) : (
                <div className="px-4 py-8 flex flex-col justify-center items-center gap-8 text-lg font-medium text-gray-200 text-center">
                    <h1>Something has seriously gone wrong. <br/>
                        We're trying to fix it as soon as possible.
                    </h1>
                    <p>Try again later.</p>
                </div>
            )}
        </>
    );
};

interface IVehicleUnmarkFromSale { 
    vehicleId: string | undefined
    callback: () => void 
};

export const VehicleUnmarkFromSale: React.FC<IVehicleUnmarkFromSale> = ({ 
    vehicleId, 
    callback
}) => {
    const [
        unmarkFromSaleVehicle,
        { 
            loading,
            error
        }
    ] = useMutation(MARK_FOR_SALE_VEHICLE, {
        onCompleted: ({ markVehicleForSale: { success, message }}) => {
            if (success) {
                callback();
                Toast('success', message);
            } else {
                Toast('error', message);
            }
        },
        onError: error => Toast('error', error.message),
        update: (cache, { data: { markVehicleForSale: { vehicle } } }) => {
            try {
                const cachedData = cache.readQuery({
                    query: GET_VEHICLES_MARKED_FOR_SALE
                })
                const copyOfCache = JSON.parse(JSON.stringify(cachedData));
                const indexOfUnmarkedVehicle = copyOfCache.vehicleForSale.findIndex((unmarkedVehicle: IVehicle) => vehicle.id === unmarkedVehicle.id);
                copyOfCache.vehicleForSale.splice(indexOfUnmarkedVehicle, 1);
                cache.writeQuery({
                    query: GET_VEHICLES_MARKED_FOR_SALE,
                    data: copyOfCache
                })
            } catch (error) {
                Toast('error', error as string)
            }
        }
    });
    
    const handleUnmarkFromSale = () => {
        if (!!vehicleId) {
            unmarkFromSaleVehicle({ variables: { id: vehicleId, price: 0 } });
        } else {
            Toast('error', "Something went wrong with the recognition of the vehicle. Please try again later!");
        }
    }

    return (
        <>
            { !error || !vehicleId ? (
                <LoadingButton 
                    text='Unmark the vehicle from sale'
                    condition={loading}
                    type={"button"}
                    className="ActiveBar_button--danger"
                    onClick={handleUnmarkFromSale}
                />
            ) : (
                <button 
                    disabled 
                    className="ActiveBar_button--danger cursor-default"
                >
                    Unmark the vehicle from sale<br/>
                    An error occurred!<br/>
                    Try again later.
                </button>
            )}
        </>
    );
};