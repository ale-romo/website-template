import { useState, useEffect, cloneElement, ReactNode, FC, ReactElement } from 'react';
import styled  from 'styled-components';
import { useSwipeable } from 'react-swipeable';

const CarouselViewport = styled.div`
  overflow: hidden;
  width: 100%;
`;

interface ItemCollectionProps {
  activeIndex: number;
};

const ItemCollection = styled.div<ItemCollectionProps>(({
  activeIndex,
}) => `
  white-space: nowrap;
  transition: transform 0.3s;
  transform: translateX(-${activeIndex * 100}%);
  @media (max-width: 768px) {
    transform: translateX(-${activeIndex * 84}%)
  }
`);

const StyledCarouselItem = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  background-color: green;
  color: #fff;
  width: 100%;
  @media (max-width: 768px) {
    transform: scale3d(80%, 80%, 100%);
    margin: 0 -8%;
    &:first-child {
      margin-left: 0;
    }
  }
`;

interface StyledBulletProps {
  isActive: boolean;
  color: string;
};

const StyledBullet = styled.button<StyledBulletProps>(({
  color,
  isActive,
}) =>`
  border: solid 1px ${color};
  background-color: ${isActive ? color : ''};
  width: 14px;
  height: 14px;
  border-radius: 7px;
`)

const StyledNavContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 15px;
  padding: 10px;
  justify-content: center;
  align-items: center;
`

interface CarouselItemProps {
  children: any;
};

export const CarouselItem = ({ children}: CarouselItemProps) => {
  return <StyledCarouselItem>
    {children}
  </StyledCarouselItem>
}

interface CarouselProps {
  children: ReactNode[];
};

const Carousel: FC<CarouselProps> = ({ children }): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const interval  = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, 10000);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    }
  });

  const updateIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = children.length - 1;
    } else if (newIndex >= children.length) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex +1),
    onSwipedRight: () => updateIndex(activeIndex -1)
  });

  if (!Array.isArray(children)) return cloneElement(children);
  return <CarouselViewport
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    {...handlers}>
    <>
      <ItemCollection activeIndex={activeIndex}>
          {children.map((child) => cloneElement(child as ReactElement<any>))}
      </ItemCollection>
      <StyledNavContainer>
        <button onClick={() => updateIndex(activeIndex -1)}>Prev</button>
          {children.map((child, index) => {
              return <StyledBullet
                key={index}
                onClick={() => updateIndex(index)}
                color="#FF006F"
                isActive={index === activeIndex}
                />
            })
          }
        <button onClick={() => updateIndex(activeIndex +1)}>Next</button>
      </StyledNavContainer>
    </>
  </CarouselViewport>
};

export default Carousel;

