import Image from 'next/image';
import Banner from 'components/Banner';
import Hero from 'components/Hero';
import Nav from 'components/Nav';
import Concept from 'components/Concept';

const HomePage = () => {
  return <>
  <Banner>Announcements go here</Banner>
  <Hero backgroundImage="home_hero-bkg.png">
    <Image src="/logo_large.svg" alt="Lúptiico - El valle en la palma de tu mano" width="300" height="442" />
    <Nav />
  </Hero>
  <Concept />
  </>
}

export default HomePage;
