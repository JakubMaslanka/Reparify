import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import "./app.css";

interface Vehicle {
  id: string,
  mark: string,
  model: string,
  vin: string,
  productionYear: Number,
  photos: string[],
  fuelType: string,
  power: Number,
  transmission: string,
  bodyType: string,
  owner: string,
  createdAt: string,
  techReviewExpDate: string,
  insuranceExpDate: string,
  repairList: {
      date: string,
      workshop: string,
      description: string
  }[],
  user?: {
      type: any,
      ref: string
  }
}

const GET_ALL_VEHICLES = gql`
  query GetAllVehicles {
    vehicles {
      id
      mark
      model
      vin
      techReviewExpDate
      insuranceExpDate
      productionYear
      fuelType
      power
      transmission
      bodyType
      owner
      photos
      repairList {
        createdAt
        workshop
        description
      }
    }
  }
`;

function App(): JSX.Element {
  const { loading, error, data } = useQuery(GET_ALL_VEHICLES, {
    onError: (error) => {
      console.log(error.message);
    },
    errorPolicy: "all",
  });
  if (loading) {
    return <h1>Loading...</h1>
  } else if (error) {
    return <h1>Couldn't load the content...</h1>
  }
  const { vehicles } = data;

  return (
    <div className="container">
      {
        vehicles.map((vehicle: Vehicle)  => (
          <div key={vehicle.id}>
            <ImageSlider slides={vehicle.photos} />
            <div className="title">
              <h3>{vehicle.mark}</h3>
              <h3>{vehicle.model}</h3>
            </div>
            <span>Production Year: {vehicle.productionYear}</span><br/>
            <span>Power: {vehicle.power}</span><br/>
            <span>Fuel Type: {vehicle.fuelType}</span><br/>
            <hr />
          </div>
        ))
      }
    </div>
  );
}

export default App;


const ImageSlider: React.FC<{slides: string[]}> = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className='slider'>
      <button type='button' className='left-arrow' onClick={prevSlide}>&lt;</button>
      <button type='button' className='right-arrow' onClick={nextSlide}>&gt;</button>
      {slides.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <img src={slide} className='image' alt="bmw" />
            )}
          </div>
        );
      })}
    </section>
  );
};