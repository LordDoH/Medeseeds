import React from 'react';

import CategoryCard from './CategoryCard/CategoryCard';
import DeliveryPolicy from '../../layout/DeliveryPolicy/DeliveryPolicy';
import GuaranteePolicy from '../../layout/GuaranteePolicy/GuaranteePolicy';
import Slide1 from '../../../assets/images/Slide1.jpg';
import Slide2 from '../../../assets/images/Slide2.jpg';
import Termo from '../../../assets/images/Termo.png';
import './Categories.scss';
import Allied from '../../layout/Allied/Allied';

function Categories() {
  const fakeCategoryData = [
    { title: 'Accesories', image: Termo },
    { title: 'Accesories', image: Slide1 },
    { title: 'Accesories', image: Slide2 },
    { title: 'Accesories', image: Termo },
    { title: 'Electrical Accesories', image: Termo },
    { title: 'Electrical Accesories', image: Termo },
    { title: 'Electrical Accesories', image: Termo },
    { title: 'Electrical Accesories', image: Termo },
    { title: 'Electrical Accesories', image: Termo },
  ];

  return (
    <div className="categories">
      <div className="categories__title">Categories</div>
      <div className="categories__cards">
        {fakeCategoryData.map((e) => (
          <CategoryCard image={e.image} title={e.title} />
        ))}
      </div>
      <button type="button" className="categories__more_btn">
        More
      </button>
      <DeliveryPolicy />
      <GuaranteePolicy />
      <Allied />
    </div>
  );
}

export default Categories;
