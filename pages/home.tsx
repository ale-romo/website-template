import type { NextPage, InferGetStaticPropsType, GetStaticProps } from 'next'
import { GraphQLClient, gql } from 'graphql-request';
import Image from 'next/image';
import Banner from 'components/Banner';
import Hero from 'components/Hero';
import Nav from 'components/Nav';
import Concept from 'components/Concept';
import Carousel from 'components/Carousel';

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
    <Nav />
  </Hero>
  <Concept />
  <Carousel assets={assets} />
  </>
}

export default HomePage;
