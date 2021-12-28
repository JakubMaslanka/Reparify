import React from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_CURRENT_USER_VEHICLE } from '../../api/queries';
import { Vehicle } from '../../models/vehicle';
import { Menu } from '../Menu';
import { BiCar } from "react-icons/bi";
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import { LoadingSpinner } from '../../utils/LoadingSpinner';
import '@brainhubeu/react-carousel/lib/style.css';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_CURRENT_USER_VEHICLE, {
    onError: (error) => {
      console.log(error.message);
    },
    errorPolicy: "all",
  });
  if (loading) {
    return <LoadingSpinner />
  } else if (error) {
    return <h1>Couldn't load the content...</h1>
  }
  
  const { currentUserVehicles } = data;

  return (
    <>
      <Menu title="Dashboard" userVehicles={currentUserVehicles} />
      <div className="w-full text-gray-100 text-xl font-semibold px-4 mt-4">Your cars:</div>
      {
        currentUserVehicles.length > 0 ? (
          <Carousel 
            plugins={[
              'clickToChange',
              {
                resolve: slidesToShowPlugin,
                options: {
                  numberOfSlides: 2
                }
              },
            ]} 
            itemWidth={275}
          >
              {
                currentUserVehicles.map((vehicle: Vehicle)  => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))
              }
          </Carousel>
        ) : (
          <div className="px-4 mt-4 text-center">
            <div className="w-full flex flex-col justify-center items-center gap-8 bg-gray-800 rounded-xl shadow-xl p-4">
              <p className="text-gray-200 text-lg font-semibold">It looks like you don't own any vehicles...</p>
              <div onClick={() => navigate('/vehicle/add')} className="flex items-center gap-2 border-2 rounded-full border-greenish-dark hover:bg-greenish-dark text-greenish-light hover:text-gray-800 text-lg font-medium px-4 py-2 cursor-pointer"><BiCar />Add vehicle!</div>
            </div>
          </div>
        )
      }
    </>
  );
};

const VehicleCard = ({vehicle} : {vehicle: Vehicle}) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/vehicle/${vehicle.id}`)} className="relative w-11/12 h-52 mx-auto mt-4">
      <img src={vehicle.photos[0]} alt="vehiclePicture" className="mx-auto object-cover object-top rounded-2xl shadow-2xl h-full w-full" />
      <div className="absolute w-full h-full top-0 bg-gradient-to-t from-gray-900 to-transparent rounded-2xl">
        <h2 className="absolute bottom-0 p-6 text-white-500 text-xl font-medium uppercase">{`${vehicle.mark} ${vehicle.model}`}</h2>
      </div>
    </div>
  );
};