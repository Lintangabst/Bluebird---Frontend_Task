import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

interface CarType {
  vehicle: string;
  imageURL: string;
  price: string;
  description: string[];
}

interface VehicleType {
  id: number;
  car_type: CarType[];
}

interface Props {
  vehicles: VehicleType[];
  selectedCategory: number | null;
  lovedVehicles: string[];
  toggleLoveStatus: (vehicle: string) => void;
}

const VehicleList: React.FC<Props> = ({ vehicles, selectedCategory, lovedVehicles, toggleLoveStatus }) => {
  const filteredVehicles = selectedCategory
    ? vehicles.filter(vehicle => vehicle.id === selectedCategory)
    : vehicles;

  return (
    <section className={`mt-8 ${selectedCategory ? 'flex flex-wrap -mx-4' : ''}`}>
      {selectedCategory ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Vehicle List</h2>
          {filteredVehicles.map(vehicleType => (
            <div key={vehicleType.id} className="flex w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-4 mb-8">
              {vehicleType.car_type.map(car => (
                <div key={car.vehicle} className="mb-8 flex-1 ml-8">
                  <div className="bg-white p-6 rounded h-full w-96 shadow cursor-pointer">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">{car.vehicle}</h3>
                      <button
                        className={`text-red-500 ${lovedVehicles.includes(car.vehicle) ? 'text-love' : ''}`}
                        onClick={() => toggleLoveStatus(car.vehicle)}
                      >
                        <FontAwesomeIcon icon={faHeart} className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <img
                        src={car.imageURL || ''}
                        alt={car.vehicle}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500">{car.description.join(' ')}</p>
                      <p className="text-blue-500 font-semibold">{car.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </>
      ) : null}
    </section>
  );
};

export default VehicleList;
