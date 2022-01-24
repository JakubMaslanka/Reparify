import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IVehicle } from '../../models/vehicle';

interface VehicleCardProps {
    vehicle: IVehicle
    withTags?: boolean 
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
    vehicle, 
    withTags = true 
}) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/vehicle/${vehicle.id}`)} className="relative w-11/12 h-52 mx-auto mt-4">
      <img src={vehicle.photos[0]} alt="vehiclePicture" className="mx-auto object-cover object-top rounded-2xl shadow-2xl h-full w-full" />
      {withTags && (
        <>
          {!!vehicle.isArchived && <div className="absolute top-0 right-1 bg-danger-dark text-white-500 uppercase px-2 py-1 text-xs font-light rounded-full shadow-2xl -mt-2">archived</div>}
          {!!vehicle.isMarkedForSale && <div className="absolute top-0 right-1 bg-greenish-dark text-white-500 uppercase px-2 py-1 text-xs font-light rounded-full shadow-2xl -mt-2">for sale</div>}
        </>
      )}
      <div className="absolute w-full h-full top-0 bg-gradient-to-t from-gray-900 to-transparent rounded-2xl">
        <h2 className="absolute bottom-0 p-6 text-white-500 text-xl font-medium uppercase">{`${vehicle.mark} ${vehicle.model}`}</h2>
      </div>
    </div>
  );
};