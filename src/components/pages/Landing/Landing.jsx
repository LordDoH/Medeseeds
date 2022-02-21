import React from 'react';
import './Landing.scss';
import { IoIosArrowUp } from 'react-icons/io';
import { BsWhatsapp } from 'react-icons/bs';
import Termo from '../../../assets/images/Termo.png';
import Slide from './Slide/Slide';
import ProductCard from './ProductCard/ProductCard';
import CategoryCard from './CategoryCard/CategoryCard';
import LearnCard from './LearnCard/LearnCard';
import Slide1 from '../../../assets/images/Slide1.jpg';
import Slide2 from '../../../assets/images/Slide2.jpg';
import Allied from '../../layout/Allied/Allied';

function Landing() {
  const scrollUp = () => {
    window.scroll(0, 0);
  };

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

  const fakeCategoryData = [
    { title: 'Accesories', image: Termo },
    { title: 'Accesories', image: Slide1 },
    { title: 'Accesories', image: Slide2 },
    { title: 'Accesories', image: Termo },
    { title: 'Electrical Accesories', image: Termo },
  ];

  const fakePostData = [
    {
      title: 'Awesome title',
      image: Slide1,
      description:
        'Awesome introduction for this blog post; here will be something you would like to learn in the future or maybe right now, at this precise moment, something valuable to learn.',
    },
    {
      title: 'Awesome title',
      image: Slide1,
      description:
        'Awesome introduction for this blog post; here will be something you would like to learn in the future or maybe right now, at this precise moment, something valuable to learn.',
    },
    {
      title: 'Awesome title longer than everyone else doing jobs',
      image: Slide1,
      description:
        'Awesome introduction for this blog post; here will be something you would like to learn in the future or maybe right now, at this precise moment, something valuable to learn.',
    },
  ];

  const goWhatsapp =
    'https://wa.me/573015317547/?text=Saludos,%20quiero%20información%20adicional%20de%20los%20productos';

  return (
    <div className="landing">
      <Slide />
      <div className="landing__top">Top Products</div>
      <div className="landing__top_cards">
        {fakeProductData.map((e) => (
          <ProductCard
            image={e.image}
            brand={e.brand}
            title={e.title}
            price={e.price}
          />
        ))}
      </div>
      <div className="landing__phrase">“Plow the land, grow your mind”</div>
      <div className="landing__categories">Categories</div>
      <div className="landing__categories_cards">
        {fakeCategoryData.map((e) => (
          <CategoryCard image={e.image} title={e.title} />
        ))}
      </div>
      <button type="button" className="landing__more_btn">
        More
      </button>
      <div className="landing__learn">Learn and Practice</div>
      <div className="landing__learn_cards">
        {fakePostData.map((e) => (
          <LearnCard
            image={e.image}
            title={e.title}
            description={e.description}
          />
        ))}
      </div>
      <button type="button" className="landing__more_btn">
        More
      </button>
      {/* eslint-disable-next-line */}
      <a className="landing__whatsapp" href={goWhatsapp}>
        <BsWhatsapp />
      </a>
      {/* eslint-disable-next-line */}
      <div className="landing__scroll_up" onClick={scrollUp}><IoIosArrowUp /></div>
      <Allied />
    </div>
  );
}

export default Landing;
