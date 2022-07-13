import { useState, cloneElement, ReactNode, FC, ReactElement } from 'react';
import styled from 'styled-components';

const CarouselViewport = styled.div`
  overflow: hidden;
`

interface ItemCollectionProps {
  activeIndex: number;
}

const ItemCollection = styled.div<ItemCollectionProps>`
  white-space: nowrap;
  transition: transform 0.3s;
  transform: translateX(-${props => props.activeIndex * 100}%);
`
interface StyledCarouselItemProps {
  width: string;
}

const StyledCarouselItem = styled.div<StyledCarouselItemProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: green;
  color: #fff;
  width: ${(props) => props.width};
`
interface CarouselItemProps {
  children: any;
  width: string;
}

export const CarouselItem = ({ children, width }: CarouselItemProps) => {
  return <StyledCarouselItem width={width}>
    {children}
  </StyledCarouselItem>
}

interface CarouselProps {
  children: ReactNode[];
};

const Carousel: FC<CarouselProps> = ({ children }): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);
  const updateIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= children.length) {
      newIndex = children.length -1;
    }
    setActiveIndex(newIndex);
  }
  if (!Array.isArray(children)) return cloneElement(children, { width: "100%"});
  return <CarouselViewport>
    <ItemCollection activeIndex={activeIndex}>
        {children.map((child) => cloneElement(child as ReactElement<any>, { width: "100%" }))};
    </ItemCollection>
    <button onClick={() => updateIndex(activeIndex -1)}>Prev</button>
    <button onClick={() => updateIndex(activeIndex +1)}>Next</button>
  </CarouselViewport>
}

export default Carousel;

