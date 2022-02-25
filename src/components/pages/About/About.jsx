import React from 'react';
import Logo from '../../../assets/images/LogoRound.png';
import Creators from '../../../assets/images/Creators.jpeg';
import Slide3 from '../../../assets/images/Slide3.jpg';
import './About.scss';
import Allied from '../../layout/Allied/Allied';

function About() {
  return (
    <div className="about">
      <div className="about__bubble type1">
        <img src={Logo} alt="" className="about__bubble__image" />
      </div>
      <div className="about__bubble type2">
        <div className="about__bubble__title">Who we are</div>
        <div className="about__bubble__description">
          We are entrepreneurs dedicated to educating people about cannabis
          medicinal uses and teaching plant growing processes offering,
          supplies, and tools needed to have your crops indoors in the best way
          possible. We believe that cannabis is healthier and more sustainable
          than alcohol or cigarettes.
        </div>
      </div>
      <div className="about__bubble type1">
        <img src={Creators} alt="" className="about__bubble__image" />
      </div>
      <div className="about__bubble type2">
        <div className="about__bubble__title">Our work</div>
        <div className="about__bubble__description">
          Daily we test fertilizers, seeds, lights, and others, to offer you the
          best tools to grow your crops, we develop techniques and soil
          substracts to give your plants nutrients and strength to get bigger
          yields and make medicinal and esthetic products.
        </div>
      </div>
      <div className="about__bubble type1">
        <img src={Slide3} alt="" className="about__bubble__image" />
      </div>
      <div className="about__bubble type2">
        <div className="about__bubble__title">Get in touch</div>
        <div className="about__bubble__description">
          Send us an e-mail: <br />
          medeseeds@gmail.com <br />
          Or Call Us: <br /> +57 301 531 75 47{' '}
        </div>
      </div>
      <Allied />
    </div>
  );
}

export default About;
