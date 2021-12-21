import React from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_ALL_VEHICLES } from '../../api/queries';
import { Vehicle } from '../../models/vehicle';
import { Navbar } from '../Navbar/Navbar';
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import { LoadingSpinner } from '../../utils/LoadingSpinner';
import '@brainhubeu/react-carousel/lib/style.css';

export const Dashboard: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_VEHICLES, {
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
  const { vehicles } = data;

  return (
    <>
      <Navbar title="Dashboard"/>
      <div className="w-full text-gray-100 text-xl font-semibold px-4 mt-4">Your cars:</div>
      <Carousel plugins={[
          'clickToChange',
          {
            resolve: slidesToShowPlugin,
            options: {
              numberOfSlides: 2
            }
          },
        ]} itemWidth={275}>
          {
            vehicles.map((vehicle: Vehicle)  => (
              <VehicleCard key={vehicle.vin} vehicle={vehicle} />
            ))
          }
      </Carousel>
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