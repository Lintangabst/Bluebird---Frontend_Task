import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white">
          <a href="/" className="mr-4">Home</a>
          <a href="/Wishlist" className="mr-4">Wishlist</a>
          <a href="/MyBook" className="mr-4">MyBook</a>
          <a href="/SearchPage" className="mr-4">Search Form</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
