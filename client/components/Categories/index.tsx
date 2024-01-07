import React from 'react';
import Slider from 'react-slick';

interface Category {
  id: number;
  name: string;
  imageURL: string;
}

interface Props {
  categories: Category[];
  selectedCategory: number | null;
  setSelectedCategory: (categoryId: number) => void;
}

const Categories: React.FC<Props> = ({ categories, selectedCategory, setSelectedCategory }) => {
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

  return (
    <section className="mb-8 relative">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <Slider {...carouselSettings}>
        {categories.map((category, index) => (
          <div
            key={category.id}
            className={`mx-auto w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 mb-8 ${
              selectedCategory === category.id ? 'opacity-80' : ''
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <div className="relative w-auto overflow-hidden rounded-lg pl-8 mr-8 shadow-inner">
              <img
                src={category.id === 1 ? 'https://www.bluebirdgroup.com/img/armadaservicetype/626901eccdb74.png?w=127' : category.imageURL || ''}
                alt={category.name}
                className="w-full h-auto object-cover mb-2 rounded-lg"
              />

              <div className="absolute top-0 left-0 w-1/6 h-full flex items-center">
                {index !== 0 && (
                  <button
                    onClick={() => {
                      const newIndex = index - 1;
                      setSelectedCategory(categories[newIndex].id);
                    }}
                    className="text-white hover:text-gray-300"
                  >
                    &#8249;
                  </button>
                )}
              </div>
              <div className="absolute top-0 right-0 w-1/6 h-full flex items-center">
                {index !== categories.length - 1 && (
                  <button
                    onClick={() => {
                      const newIndex = index + 1;
                      setSelectedCategory(categories[newIndex].id);
                    }}
                    className="text-white hover:text-gray-300"
                  >
                    &#8250; 
                  </button>
                )}
              </div>
            </div>
            <p className="text-center mt-2 font-semibold">{category.name}</p>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Categories;
