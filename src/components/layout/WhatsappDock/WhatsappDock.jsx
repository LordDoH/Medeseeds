import React from 'react';
import { BsWhatsapp } from 'react-icons/bs';
import './WhatsappDock.scss';

function WhatsappDock() {
  const goWhatsapp =
    'https://wa.me/573015317547/?text=Saludos,%20quiero%20información%20adicional%20de%20los%20productos';
  return (
    <a className="whatsappdock" href={goWhatsapp}>
      <BsWhatsapp />
    </a>
  );
}

export default WhatsappDock;
