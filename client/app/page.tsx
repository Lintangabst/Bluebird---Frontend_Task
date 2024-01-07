"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faHeart } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from '@/components/Navbar';
import Categories from '@/components/Categories';
import Footer from '@/components/Footer';
import VehicleDetailPage from './VehicleDetailPage/page';

interface Category {
  id: number;
  name: string;
  imageURL: string;
}

interface VehicleType {
  id: number;
  category_id: number;
  car_type: CarType[];
}

interface CarType {
  vehicle: string;
  imageURL: string;
  price: string;
  description: string[];
  isLiked: boolean;
}

const LOCAL_STORAGE_KEY = 'wishlist';


const carouselSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [vehicles, setVehicles] = useState<VehicleType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<CarType | null>(null);  // Add selectedVehicle state
  const [lovedVehicles, setLovedVehicles] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://private-f2fbfb-ridecar2.apiary-mock.com/vehicles')
      .then(response => {
        setCategories(response.data.category);
        setVehicles(response.data.type);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

    useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lovedVehicles));
    }, [lovedVehicles]);

  const filteredVehicles = selectedCategory
    ? vehicles.filter(vehicle => vehicle.category_id === selectedCategory)
    : vehicles;

  const toggleLoveStatus = (vehicle: string) => {
    if (lovedVehicles.includes(vehicle)) {
      setLovedVehicles(lovedVehicles.filter(v => v !== vehicle));
    } else {
      setLovedVehicles([...lovedVehicles, vehicle]);
    }
  };

  const handleBookClick = (vehicle: CarType) => {
    window.location.href="http://localhost:3000/MyBook"
      };

  return (
    <div>
      <Navbar />

      <div className="container mx-auto mt-8 pt-20 pb-20">
        <Categories
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <section className={`mt-8 ${selectedCategory ? 'flex flex-wrap -mx-4' : ''}`}>
          {selectedCategory ? (
            <>
        <h2 className="text-2xl font-bold mb-4">Vehicle List</h2>

              {filteredVehicles.map(vehicleType => (
                <div key={vehicleType.id} className=" pl-44 flex w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-4 mb-8">
                  {vehicleType.car_type.map(car => (
                    <div key={car.vehicle} className="mb-8 flex-1 ml-8">
                      <div className="bg-white p-6 rounded h-full w-96 shadow cursor-pointer" onClick={() => setSelectedVehicle(car)}>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold">{car.vehicle}</h3>
                          <button
  className={`text-${lovedVehicles.includes(car.vehicle) ? 'red-500' : 'black'}`}
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

        {selectedVehicle && (
          <VehicleDetailPage
            vehicleDetails={selectedVehicle}
            onLikeClick={() => toggleLoveStatus(selectedVehicle.vehicle)}
            onShareClick={() => {/* Implement share logic */}}
            onBookClick={() => handleBookClick(selectedVehicle)}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
