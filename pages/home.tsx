import type { NextPage, InferGetStaticPropsType, GetStaticProps } from 'next';
import { GraphQLClient, gql } from 'graphql-request';
import Intro from 'lpFragments/Intro';
import Cabins from 'lpFragments/Cabins';



const graphcms = new GraphQLClient(
  'https://api-us-west-2.graphcms.com/v2/cl3hm379u66tu01zdg2q9ermw/master'
);

const QUERY = gql`
  {
    assets {
      url
      width
      height
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
    <Intro />
    <Cabins />
    {/* <Carousel color="#FF006F" interval={5000}>
      {assets.map(({ url, width, height }: any, index: number) => <CarouselItem key={index}>
        <Image src={url} width={width} height={height} alt={url} />
      </CarouselItem>)}
    </Carousel> */}
  </>
}

export default HomePage;
