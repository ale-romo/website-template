import type { NextPage, InferGetStaticPropsType, GetStaticProps } from 'next';
import { useRef, useLayoutEffect, useState } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import Image from 'next/image';
import Banner from 'components/Banner';
import Hero from 'components/Hero';
import Nav from 'components/Nav';
import Concept from 'components/Concept';
import Carousel,  { CarouselItem } from 'components/Carousel';
import StickyPanel from 'components/StickyPanel';
import BurgerMenu from 'components/BurgerMenu';
import useWindowSize from 'utils/useWindowSize';

const graphcms = new GraphQLClient(
  'https://api-us-west-2.graphcms.com/v2/cl3hm379u66tu01zdg2q9ermw/master'
);

const QUERY = gql`
  {
    assets {
    url
  }
}
`;

export const getStaticProps: GetStaticProps = async () => {
  const { assets } = await graphcms.request(QUERY)


  return {
    props: {
      assets: assets
    }
  }
};

const HomePage: NextPage = ({ assets }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const windowSize = useWindowSize();
  const showBurger = windowSize.width < 768;

  return <>
    <Banner>Próxima apertura</Banner>
    <div>
      <Hero backgroundImage="home_hero-bkg.png">
        <Image src="/logo_large.svg" alt="Lúptiico - El valle en la palma de tu mano" width="300" height="442" />
        <Nav />
        <StickyPanel>
          <BurgerMenu showBurger={showBurger}>
            <Nav direction="column" color="rgba(255, 95, 111, .7)" />
          </BurgerMenu>
        </StickyPanel>
      </Hero>
    </div>
    <Concept />
    <Carousel>
      {assets.map(({ url }: any, index: number) => <CarouselItem key={index}>
        <Image src={url} width="400px" height="200px" alt={url} />
      </CarouselItem>)}
    </Carousel>
  </>
}

export default HomePage;
