import { ReactNode, useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import styled from 'styled-components';

const StyledCarousel = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

interface StyledCollectionProps {
  activeIndex: number;
  cardStyle: boolean;
}

const StyledCollection = styled.div<StyledCollectionProps>(({
  activeIndex,
  cardStyle,
}) => `
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: stretch;
  transition: transform 0.3s;
  transform: translateX(-${activeIndex * 100}%);
  @media (max-width:${cardStyle ? '768px' : 0}) {
    transform: translateX(-${activeIndex * 85}%);
    column-gap: 5%;
  }
`);

interface StyledItemProps {
  cardStyle: boolean;
}

const StyledItem = styled.div<StyledItemProps>(({
  cardStyle,
}) =>`
  width: 100%;
  flex: 0 0 auto;
  @media (max-width: ${cardStyle ? '768px' : 0}) {
    width: 80%;
    &:first-child {
      margin-left: 10%;
    }
  }
`);

interface StyledNavProps {
  display: 'left' | 'center'| 'right' | 0;
  cardStyle: boolean;
}

const StyledNav = styled.div<StyledNavProps>(({
  display,
  cardStyle,
}) =>  `
  display: ${display ? 'flex' : 'none'};
  flex-direction: row;
  column-gap: 22px;
  padding: 10px;
  justify-content: ${display};
  align-items: center;
  @media (max-width: ${cardStyle ? '768px' : 0}) {
    margin-left: 10%;
    margin-right: 10%;
  }
`);

interface StyledBulletProps {
  isActive: boolean;
  color: string;
};

interface StyledNavButtonProps {
  role: 'prev' | 'next';
  edge: boolean;
  color: string;
}

const StyledButton = styled.button<StyledNavButtonProps>(({
  role,
  edge,
  color,
}) => `
  border: none;
  background: none;
  display: ${edge ? 'none' : 'initial'};
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  left: ${role === 'prev' ? '20px': 'auto'};
  right: ${role === 'next' ? '20px' : 'auto'};
  transform: translateY(calc(-50% - 18px)) rotate(${role === 'prev' ? '-45deg' : '135deg'});
  &:before, &:after {
    content: "";
    background-color: ${color};
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
  @media (max-width: 768px) {
    display: none;
  }

`);

const StyledBullet = styled.button<StyledBulletProps>(({
  color,
  isActive,
}) =>`
  border: solid 1px ${color};
  background-color: ${isActive ? color : 'transparent'};
  width: 12px;
  height: 12px;
  transition: background-color 0.5s;
  border-radius: 6px;
  padding: 0;
`)

interface Props {
  children: ReactNode[];
  interval?: number;
  color?: string;
  cardStyle?: boolean;
  navDisplay?: 'left' | 'center'| 'right' | 0;
}

/**
 * Flex Carousel
 *
 * @version 1.0.1
 * @author [Ale Romo](https://github.com/ale-romo)
 */

const Carousel = ({
  children,
  interval = 0,
  color = 'black',
  cardStyle = true,
  navDisplay = 'center',
}: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const bullets: ReactNode[] = [];

  useEffect(() => {
    const autoplay  = setInterval(() => {
      if (!paused && interval) {
        updateIndex(activeIndex + 1);
      }
    }, interval);
    return () => {
      if (autoplay) {
        clearInterval(autoplay);
      }
    }
  });

  // enabling carousel navigation
  const updateIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = children.length - 1;
    } else if (newIndex >= children.length) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  // Adding Swiping capabilities for mobile
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

  return <StyledCarousel
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    {...handlers}
  >
    <StyledCollection activeIndex={activeIndex} cardStyle={cardStyle}>
      {children.map((child, index) => {
        bullets.push(<StyledBullet
          key={index}
          isActive={index === activeIndex}
          onClick={() => updateIndex(index)}
          color={color}
        />);
        return <StyledItem key={index} cardStyle={cardStyle}>
          {child}
        </StyledItem>
      })};
    </StyledCollection>
    <StyledButton
        onClick={() => updateIndex(activeIndex -1)}
        role="prev"
        edge={activeIndex === 0}
        color={color}
      />
    <StyledNav display={navDisplay} cardStyle={cardStyle}>
      {bullets}
    </StyledNav>
    <StyledButton
      onClick={() => updateIndex(activeIndex +1)}
      role="next" edge={activeIndex === children.length -1}
      color={color}
    />
  </StyledCarousel>
}

export default Carousel;
