import React from 'react';
import WhatsappDock from '../../layout/WhatsappDock/WhatsappDock';
import UpsideDock from '../../layout/UpsideDock/UpsideDock';
import Allied from '../../layout/Allied/Allied';
import HelpSlice from '../../layout/HelpSlice/HelpSlice';
import JoinUs from '../../layout/JoinUs/JoinUs';
import './Posts.scss';
import LearnCard from '../Landing/LearnCard/LearnCard';

function Posts() {
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
    {
      title: 'Root growth',
      image:
        'https://res.cloudinary.com/medeseeds/image/upload/v1645818481/Roots_v6glct.jpg',
      description:
        'When the flowering cycle is started, it’s irrelevant how big the plant is. A large and healthy root ball during the vegetative period is much more important for optimal development. In the first 3 to 4 weeks of flowering, the plants will grow very quickly without showing any recognisable defects, even when root development has been poor.',
    },
    {
      title:
        'Cold feet, overly low night temperatures and overly damp flowering room',
      image:
        'https://res.cloudinary.com/medeseeds/image/upload/v1645818481/Cold_fyx3n4.jpg',
      description:
        'In a box that exhibits a comfortable temperature of 25 to 28°C at the height of the plant tops, it can easily be only 12°C or less at ground level. In those types of boxes, where plants have cold feet, climate will always be a problem as the metabolic process in the root area slows down. If less nutrients are processed by the metabolic process the soil will be damp all the time as a result of which humidity increases.',
    },
  ];

  return (
    <div className="learn">
      <div className="learn__title">Learn And Practice</div>
      <div className="learn__cards">
        {fakePostData.map((e) => (
          <LearnCard
            key={`learn${Math.random()}`}
            image={e.image}
            title={e.title}
            description={e.description}
          />
        ))}
      </div>
      <JoinUs />
      <HelpSlice />
      <Allied />
      <WhatsappDock />
      <UpsideDock />{' '}
    </div>
  );
}

export default Posts;
