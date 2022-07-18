import { useState, useEffect, cloneElement, ReactNode, FC, ReactElement } from 'react';
import styled  from 'styled-components';
import { useSwipeable } from 'react-swipeable';

const CarouselViewport = styled.div`
  overflow: hidden;
  width: 100%;
  position: relative;
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
  color: #fff;
  width: 100%;
  vertical-align: middle;
  @media (max-width: 768px) {
    transform: scale3d(80%, 80%, 100%);
    margin: 0 -8%;
    &:first-child {
      margin-left: 0;
    }
  }
`;

interface StyledNavButtonProps {
  role: 'prev' | 'next';
  edge: boolean;
  color?: string;
}

const StyledNavButton = styled.button<StyledNavButtonProps>(({
  role,
  edge,
  color
}) => `
  border: none;
  background: none;
  display: ${edge ? 'none' : 'initial'};
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  left: ${role === 'prev' ? '10px': 'auto'};
  right: ${role === 'next' ? '20px' : 'auto'};
  transform: rotate(${role === 'prev' ? '-45deg' : '135deg'});
  &:before, &:after {
    content: "";
    background-color: ${color ? color : 'black'};
    border-radius: 3px;
    position: absolute;
    top: 0;
    left: 0;
  }
  &:before {
    width: 20px;
    height: 6px;
  }
  &:after {
    height: 20px;
    width: 6px;
  }

`);

interface StyledBulletProps {
  isActive: boolean;
  color?: string;
};

const StyledBullet = styled.button<StyledBulletProps>(({
  color,
  isActive,
}) =>`
  border: solid 1px ${color ? color : 'black'};
  background-color: ${isActive ? color ? color: 'black' : ''};
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
  color?: string;
};

const Carousel: FC<CarouselProps> = ({ children, color }): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  console.log(color)

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
    onSwipedLeft: () => {
      if (activeIndex !== children.length - 1) {
        return updateIndex(activeIndex +1)
      }
    },
    onSwipedRight: () => {
      if (activeIndex !== 0) {
        return  updateIndex(activeIndex -1)
      }
    }
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
      <StyledNavButton
        onClick={() => updateIndex(activeIndex -1)}
        role="prev"
        edge={activeIndex === 0}
        color={color}
      />
      <StyledNavContainer>
        {children.map((child, index) => {
            return <StyledBullet
              key={index}
              onClick={() => updateIndex(index)}
              color={color}
              isActive={index === activeIndex}
              />
          })
        }
      </StyledNavContainer>
      <StyledNavButton
        onClick={() => updateIndex(activeIndex +1)}
        role="next" edge={activeIndex === children.length -1}
        color={color}
      />
    </>
  </CarouselViewport>
};

export default Carousel;

