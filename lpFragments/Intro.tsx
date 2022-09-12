import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import Banner from 'components/Banner';
import Hero from 'components/Hero';
import Nav from 'components/Nav';
import StickyPanel from 'components/StickyPanel';
import BurgerMenu from 'components/BurgerMenu';
import useWindowSize from 'utils/useWindowSize';
import Carousel from 'components/Carousel';

const messages = [
  {
    title: 'Donde los sueños se hacen realidad',
    description: 'Luptico es un espacio mágico para hospedarte en el valle y disfrutar de tu espacio cuando se va el sol'
  },
  {
    title: 'Jardín',
    description: 'Trabajamos duro en crear un espacio muy especial para tu evento',
    link: {
      text: 'Agenda tu fecha 2023',
      url: '#jardin'
    }
  },
  {
    title: 'Compromiso ecológico',
    description: 'Utilizamos métodos de construcción especializados para manterer las cabañas frescas y reutilizamos el agua',
    link: {
      text: 'Conoce más',
      url: '#greenwashing'
    }
  },
  {
    title: 'Qué hacer en el valle',
    description: 'Encuentra actividades únicas en nuestra guía del valle',
    link: {
      text: 'Ver más',
      url: '#guía'
    }
  },
]

const StyledBanner = styled.section`
  margin: -60px 0 0;
  padding: 0 5%;
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const StyledCTA = styled.div`
  background-color: #FFFAF8;
  padding: 20px 50px;
  margin: 0;
  height: 100%;
  text-align: center;
  h2 {
    color: #FF006F;
    margin-top: 0;
  }
  p {
    color: #00585B;
  }
  a {
    color: #FF006F;
  }
`

const Intro = () => {
  const windowSize = useWindowSize();
  const showBurger = windowSize.width < 768;
  return <>
    <section>
      <Banner>Próxima apertura</Banner>
      <Hero backgroundImage="home_hero-bkg.png">
        <Image src="/logo_large.svg" alt="Lúptiico - El valle en la palma de tu mano" width="300" height="442" />
        <Nav />
        <StickyPanel stickTo="top">
          <BurgerMenu showBurger={showBurger} color="#FF006F">
            <Nav direction={showBurger ? 'column' : 'row'} color="rgba(255, 95, 111, .7)" />
          </BurgerMenu>
        </StickyPanel>
      </Hero>
    </section>
    <StyledBanner>
      <Carousel color="#00585B" navDisplay={'center'}>
        {messages.map((message, index) => {
          return <StyledCTA key={index}>
            {message.title &&<h2>{message.title}</h2>}
            {message.title && <p>{message.description}</p>}
            {message.link?.text && message?.link?.url && <Link href={message.link.url}>{message.link.text}</Link>}
          </StyledCTA>
        })}
      </Carousel>
    </StyledBanner>
  </>
}

export default Intro;
