import React from 'react';
import './Landing.scss';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { useDispatch } from 'react-redux';
import Slide from './Slide/Slide';
import ProductCard from './ProductCard/ProductCard';
import CategoryCard from './CategoryCard/CategoryCard';
import LearnCard from './LearnCard/LearnCard';
import Allied from '../../layout/Allied/Allied';
import Spinner from '../../layout/Spinner/Spinner';
import actions from '../../../store/action';
import WhatsappDock from '../../layout/WhatsappDock/WhatsappDock';
import UpsideDock from '../../layout/UpsideDock/UpsideDock';

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
  const categories = useQuery(GET_CATEGORIES);
  const products = useQuery(GET_PRODUCTS);

  const fakePostData = [
    {
      title: 'Cannabis Plants: Male, female and hermaphrodite',
      image:
        'https://res.cloudinary.com/medeseeds/image/upload/v1645814902/Post_1_mmtyfs.jpg',
      description:
        'Cannabis plants are not gender neutral. There are female plants, from which the actual bud flower comes. Male plants produce the pollen. However, the cannabis plant is a bit odd in this respect. Female plants can turn hermaphrodite in certain circumstances – meaning they are both male and female. This happens in a situation where the plant is highly stressed, and fears for its ongoing survival. It becomes both genders as a last resort to self-pollinate and continue to spread seeds.',
    },
    {
      title: 'Identifying pests and mould',
      image:
        'https://res.cloudinary.com/medeseeds/image/upload/v1645814426/Post_2_k0twhb.jpg',
      description:
        'A lot of growers recognise pests and mould only when their plants have already been seriously affected. At this stage, thunderbug, spider mite, soft-bodied mite, powdery mildew and downy mildew have already multiplied to the extent that it is impossible to fight them in a natural way. Only the use of specific insecticides or fungicides will do the trick, and then usually only for a short period of time.',
    },
    {
      title: 'Lighting and Chlorophyll Production in Cannabis Plants',
      image:
        'https://res.cloudinary.com/medeseeds/image/upload/v1645814426/Post_3_iiaqce.jpg',
      description:
        'Cannabis plants generate chlorophyll, a compound that converts light into food energy for the plant’s growth. Several different forms of chlorophyll, as well as secondary compounds that work with chlorophyll, are present in a cannabis plant’s leaves. Cannabis plants specifically include concentrations of chlorophyll a which absorbs light in the red to violet visible light spectrums between 430 and 600 nm, and chlorophyll b, which absorbs a broader spectrum of visible light. Sunlight contains every wavelength of light in the PAR energy spectrum at a relatively similar intensity.',
    },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const linkto = (e) => {
    dispatch(actions.loadedRoute(e));
    navigate(e);
    window.scroll(0, 0);
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
          <WhatsappDock />
          <UpsideDock />
          <Allied />
        </>
      )}
    </div>
  );
}

export default Landing;
