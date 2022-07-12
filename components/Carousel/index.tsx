import { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

const CarouselViewport = styled.div`
  overflow: hidden;
`
const ItemCollection = styled.div<Props>`
  white-space: nowrap;
  transition: transform 0.3s;
  transform: translateX(-${props => props.activeIndex * 100}%);
`

const StyledCarouselItem = styled.div<Props>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: green;
  color: #fff;
  width: ${(props) => props.width};
`
interface CarouselItemProps {
  width: string;
  children: any;
}

export const CarouselItem = ({ children, width }: CarouselItemProps) => {
  return <StyledCarouselItem width={width}>
    {children}
  </StyledCarouselItem>
}

interface CarouselProps {
  assets: string[];
};

const Carousel = ({ assets }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= assets.length) {
      newIndex = assets.length -1;
    }
    setActiveIndex(newIndex);
  }

  return <CarouselViewport>
    <ItemCollection activeIndex={activeIndex}>
      {assets.map(({ url }: any ) => (
        <CarouselItem key={url} width="100%">
          <Image src={url} width="400px" height="200px" alt={url} />
        </CarouselItem>
      ))}
    </ItemCollection>
    <button onClick={() => updateIndex(activeIndex -1)}>Prev</button>
    <button onClick={() => updateIndex(activeIndex +1)}>Next</button>
  </CarouselViewport>
}

export default Carousel;

