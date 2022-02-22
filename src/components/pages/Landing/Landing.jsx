import React from 'react';
import './Landing.scss';
import { IoIosArrowUp } from 'react-icons/io';
import { BsWhatsapp } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { useDispatch } from 'react-redux';
import Slide from './Slide/Slide';
import ProductCard from './ProductCard/ProductCard';
import CategoryCard from './CategoryCard/CategoryCard';
import LearnCard from './LearnCard/LearnCard';
import Slide1 from '../../../assets/images/Slide1.jpg';
import Allied from '../../layout/Allied/Allied';
import Spinner from '../../layout/Spinner/Spinner';
import actions from '../../../store/action';

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

function Landing() {
  const scrollUp = () => {
    window.scroll(0, 0);
  };

  const categories = useQuery(GET_CATEGORIES);
  const products = useQuery(GET_PRODUCTS);

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
  const dispatch = useDispatch();

  const linkto = (e) => {
    dispatch(actions.loadedRoute(e));
    navigate(e);
  };

  return (
    <div className="landing">
      {categories.loading ? (
        <Spinner />
      ) : (
        <>
          <Slide />
          <div className="landing__top">Top Products</div>
          <div className="landing__top_cards">
            {products.data?.getProducts.map((e, index) => {
              if (index < 5) {
                return <ProductCard key={e.id} product={e} />;
              }
              return null;
            })}
          </div>
          <div className="landing__phrase">“Plow the land, grow your mind”</div>
          <div className="landing__categories">Categories</div>

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

          <button
            onClick={() => {
              linkto('/categories');
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
                key={`learn${Math.random()}`}
                image={e.image}
                title={e.title}
                description={e.description}
              />
            ))}
          </div>
          <button
            onClick={() => {
              linkto('/learn');
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
        </>
      )}
    </div>
  );
}

export default Landing;
