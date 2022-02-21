import React from 'react';

import ProductCard from '../Landing/ProductCard/ProductCard';

import DeliveryPolicy from '../../layout/DeliveryPolicy/DeliveryPolicy';
import GuaranteePolicy from '../../layout/GuaranteePolicy/GuaranteePolicy';
import Termo from '../../../assets/images/Termo.png';

import './Products.scss';
import Allied from '../../layout/Allied/Allied';

function Products() {
  const fakeProductData = [
    {
      image: Termo,
      title: 'Termohigrometro con sonda long. variable muy barato',
      brand: 'Cornwall',
      description:
        'El mejor del mercado controla la temperatura y los ciclos de humedad en tu cultivo, ideal para interiores, cuida tus plantas, evitando hongos por exceso de humedad o acaros por altas temperaturas',
      price: 75000,
    },
    {
      image: Termo,
      title: 'Termohigrometro con sonda long. variable muy barato',
      brand: 'Cornwall',
      description:
        'El mejor del mercado controla la temperatura y los ciclos de humedad en tu cultivo, ideal para interiores, cuida tus plantas, evitando hongos por exceso de humedad o acaros por altas temperaturas',
      price: 75000,
    },
    {
      image: Termo,
      title: 'Termohigrometro con sonda long. variable muy barato',
      brand: 'Cornwall',
      description:
        'El mejor del mercado controla la temperatura y los ciclos de humedad en tu cultivo, ideal para interiores, cuida tus plantas, evitando hongos por exceso de humedad o acaros por altas temperaturas',
      price: 75000,
    },
    {
      image: Termo,
      title: 'Termohigrometro con sonda long. variable muy barato',
      brand: 'Cornwall',
      description:
        'El mejor del mercado controla la temperatura y los ciclos de humedad en tu cultivo, ideal para interiores, cuida tus plantas, evitando hongos por exceso de humedad o acaros por altas temperaturas',
      price: 75000,
    },
    {
      image: Termo,
      title: 'Termohigrometro con sonda long. variable muy barato',
      brand: 'Cornwall',
      description:
        'El mejor del mercado controla la temperatura y los ciclos de humedad en tu cultivo, ideal para interiores, cuida tus plantas, evitando hongos por exceso de humedad o acaros por altas temperaturas',
      price: 75000,
    },
  ];

  return (
    <div className="products">
      <div className="products__title">Products</div>
      <div className="products__cards">
        {fakeProductData.map((e) => (
          <ProductCard
            image={e.image}
            title={e.title}
            brand={e.brand}
            price={e.price}
          />
        ))}
      </div>
      <button type="button" className="products__more_btn">
        More
      </button>
      <DeliveryPolicy />
      <GuaranteePolicy />
      <Allied />
    </div>
  );
}

export default Products;
