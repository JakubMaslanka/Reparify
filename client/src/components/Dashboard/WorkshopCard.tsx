import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IWorkshop } from '../../models/workshop';

interface WorkshopCardProps {
    workshop: IWorkshop
}

export const WorkshopCard: React.FC<WorkshopCardProps> = ({
    workshop 
}) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/workshop/${workshop.id}`)} className="relative w-11/12 h-52 mx-auto mt-4">
      <img src={workshop.photo} alt="vehiclePicture" className="mx-auto object-cover object-top rounded-2xl shadow-2xl h-full w-full" />
      <div className="absolute w-full h-full top-0 bg-gradient-to-t from-gray-900 to-transparent rounded-2xl">
        <h2 className="absolute bottom-0 p-6 text-white-500 text-xl font-medium uppercase">{workshop.name}</h2>
      </div>
    </div>
  );
};
