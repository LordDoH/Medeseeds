import React, { useState } from 'react';
import './Slide.scss';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useQuery, gql } from '@apollo/client';

const GET_SLIDERS = gql`
  query getSImages {
    getSImages {
      image
    }
  }
`;

function Slide() {
  const { data, loading } = useQuery(GET_SLIDERS);

  const [dot, setDot] = useState(1);
  const arrImage = [1, 2, 3];
  const [active, setActive] = useState([1, 0, 0]);

  const onClickDot = (e) => {
    const prevActive = new Array(arrImage.length).fill(0);
    prevActive[e - 1] = 1;
    setActive(prevActive);
    setDot(e);
  };

  const onClickForward = () => {
    if (dot < arrImage.length) {
      const newdot = dot + 1;
      const prevActive = new Array(arrImage.length).fill(0);
      prevActive[dot] = 1;
      setActive(prevActive);
      setDot(newdot);
    } else {
      setDot(1);
      const prevActive = new Array(arrImage.length).fill(0);
      prevActive[0] = 1;
      setActive(prevActive);
    }
  };

  const onClickBackward = () => {
    if (dot > 1) {
      const newdot = dot - 1;
      const prevActive = new Array(arrImage.length).fill(0);
      prevActive[dot - (arrImage.length - 1)] = 1;
      setActive(prevActive);
      setDot(newdot);
    } else {
      setDot(arrImage.length);
      const prevActive = new Array(arrImage.length).fill(0);
      prevActive[arrImage.length - 1] = 1;
      setActive(prevActive);
    }
  };

  return (
    <div>
      {loading ? null : (
        <div className="slide">
          <div className={`slide__content state${dot}`}>
            <div className="slide__content__img">
              <img src={data.getSImages[0].image} alt="SlideImage" />
            </div>
            <div className="slide__content__img">
              <img src={data.getSImages[1].image} alt="SlideImage2" />
            </div>
            <div className="slide__content__img">
              <img src={data.getSImages[2].image} alt="SlideImage3" />
            </div>
          </div>

          <div className="slide__dots">
            {arrImage.map((e) => (
              <div
                key={`dotSlide${e}`}
                className={`slide__dots__dot active${active[e - 1]}`}
                onClick={() => onClickDot(e)}
              />
            ))}
          </div>

          <div className="slide__controls">
            <IoIosArrowBack
              className="slide__controls__backwards"
              onClick={onClickBackward}
            />

            {/* eslint-disable-next-line */}
            <IoIosArrowForward
              className="slide__controls__forwards"
              onClick={onClickForward}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Slide;
