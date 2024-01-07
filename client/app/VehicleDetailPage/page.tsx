import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

interface VehicleDetailProps {
  vehicleDetails: {
    vehicle: string;
    imageURL: string;
    description: string[];
    price: string;
    isLiked: boolean;
  };
  onLikeClick: () => void;
  onShareClick: () => void;
  onBookClick: () => void;
}

const VehicleDetailPage: React.FC<VehicleDetailProps> = ({
  vehicleDetails,
  onLikeClick,
  onShareClick,
  onBookClick,
}) => {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const copyToClipboard = () => {
    const dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = window.location.href;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  };

  const handleShareClick = () => {
    window.alert('Share this vehicle?');
    onShareClick();
    copyToClipboard();
  };

  const handleLikeClick = () => {
    onLikeClick();
    if (!wishlist.includes(vehicleDetails.vehicle)) {
      setWishlist((prevWishlist) => [...prevWishlist, vehicleDetails.vehicle]);
    }
  };

  return (
    <div className="p-8 pl-32 flex justify-center items-center bg-white shadow-md">
      <div className="w-1/2">
        <img src={vehicleDetails.imageURL || ''} alt={vehicleDetails.vehicle} className="w-96 h-auto" />
        <div className="pl-12 items-center mt-4">
          <button
            className={`pr-44 text-red-500 ${vehicleDetails.isLiked ? 'text-love' : ''} mb-2`}
            onClick={handleLikeClick}
          >
            <FontAwesomeIcon icon={faHeart} className="h-5 w-5 mr-2" />
            Like
          </button>
          <button onClick={handleShareClick} className="mb-4">
            Share
          </button>
        </div>
      </div>

      <div className="w-1/2 ml-8">
        <h2 className="text-2xl font-bold mb-4">{vehicleDetails.vehicle}</h2>
        <p className="text-gray-500">{vehicleDetails.description.join(' ')}</p>
        <div className="flex items-center mt-4">
          <p className="text-blue-500 font-semibold mr-4">{vehicleDetails.price}</p>
          <button onClick={onBookClick} className="bg-blue-500 text-white px-4 py-2 rounded">
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailPage;
