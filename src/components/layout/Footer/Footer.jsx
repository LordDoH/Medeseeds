import React from 'react';

import { GrFacebook, GrInstagram } from 'react-icons/gr';
import CBD from '../../../assets/images/CBD.png';
import THC from '../../../assets/images/THC.png';
import Leaf from '../../../assets/images/Leaf.png';
import './Footer.scss';

function Footer() {
  return (
    <div className="footer">
      <img className="footer__THC" src={THC} alt="THC Molecule" />
      <div className="footer__description">
        <div className="footer__description__info">
          <div className="footer__description__info__data">
            <ul>
              <li>Medeseeds SAS</li>
              <li>NIT 901 499 556 - 3</li>
              <li>Calle 84 #58-50</li>
              <li>Itagüí - Colombia</li>
            </ul>
          </div>
          <img
            className="footer__description__info__leaf"
            src={Leaf}
            alt="Leaf"
          />
          <div className="footer__description__info__social">
            <span>Follow us:</span>
            <span className="footer__description__info__social--networks">
              <GrInstagram />
              <GrFacebook />
            </span>
          </div>
        </div>
        <div className="footer__description__contact">
          <span>Contact: +57 301 531 75 47</span>
          <span>medeseeds@gmail.com</span>
        </div>
      </div>
      <img className="footer__CBD" src={CBD} alt="CBD Molecule" />
    </div>
  );
}

export default Footer;
