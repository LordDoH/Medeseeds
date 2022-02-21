import React from 'react';
import './Landing.scss';
import { IoIosArrowUp } from 'react-icons/io';
import { BsWhatsapp } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Termo from '../../../assets/images/Termo.png';
import Slide from './Slide/Slide';
import ProductCard from './ProductCard/ProductCard';
import CategoryCard from './CategoryCard/CategoryCard';
import LearnCard from './LearnCard/LearnCard';
import Slide1 from '../../../assets/images/Slide1.jpg';
// import Slide2 from '../../../assets/images/Slide2.jpg';
import Allied from '../../layout/Allied/Allied';
import Spinner from '../../layout/Spinner/Spinner';

const GET_CATEGORIES = gql`
  query getCategories {
    getCategories {
      id
      title
      description
      image
    }
  }
`;

const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id
      title
      description
      image
      brand
      price
    }
  }
`;

// const GET_PRODUCTS_BY_CATEGORY = gql`
//   query getProductsByCategory($categoryTitle: String) {
//     getProductsByCategory(categoryTitle: $categoryTitle) {
//       id
//       title
//       description
//       image
//       brand
//       price
//     }
//   }
// `;

function Landing() {
  const scrollUp = () => {
    window.scroll(0, 0);
  };

  const categories = useQuery(GET_CATEGORIES);
  const products = useQuery(GET_PRODUCTS);
  console.log(products);

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

  const navigate = useNavigate();

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
      {categories.loading ? (
        <Spinner />
      ) : (
        <div className="landing__categories_cards">
          {categories.data.getCategories.map((e, index) => {
            if (index < 5) {
              return (
                <CategoryCard key={e.id} image={e.image} title={e.title} />
              );
            }
            return null;
          })}
        </div>
      )}

      <button
        onClick={() => {
          navigate('/categories');
        }}
        type="button"
        className="landing__more_btn"
      >
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
      <button
        onClick={() => {
          navigate('/learn');
        }}
        type="button"
        className="landing__more_btn"
      >
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
