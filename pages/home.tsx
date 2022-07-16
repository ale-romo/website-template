import type { NextPage, InferGetStaticPropsType, GetStaticProps } from 'next'
import { GraphQLClient, gql } from 'graphql-request';
import Image from 'next/image';
import Banner from 'components/Banner';
import Hero from 'components/Hero';
import Nav from 'components/Nav';
import Concept from 'components/Concept';
import Carousel,  { CarouselItem } from 'components/Carousel';
import StickyPanel from 'components/StickyPanel';

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
  return <>
  <Banner>Announcements go here</Banner>
  <Hero backgroundImage="home_hero-bkg.png">
    <Image src="/logo_large.svg" alt="Lúptiico - El valle en la palma de tu mano" width="300" height="442" />
    <Nav uncollapsed={true} />
    <StickyPanel yShow={400}>
      <Nav color="rgba(255, 95, 111, .7)" />
    </StickyPanel>
  </Hero>
  <Concept />
  <Carousel>
    {assets.map(({ url }: any, index: number) => <CarouselItem key={index}>
      <Image src={url} width="400px" height="200px" alt={url} />
    </CarouselItem>)}
  </Carousel>
  </>
}

export default HomePage;
