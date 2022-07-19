import { ReactNode, useState, useEffect, useLayoutEffect, useRef } from 'react';
import { debounce } from 'lodash';
import styled from 'styled-components';

interface StyledStickyPanelProps {
  show: boolean;
  stick: boolean;
  stickTo: 'top' | 'bottom';
}

const StyledStickyPanel = styled.div<StyledStickyPanelProps>(({
  stick,
  show,
  stickTo
}) => `
  opacity: ${show ? 1 : 0};
  position: ${stick ? 'fixed' : 'relative'};
  z-index: 10;
  top: ${stickTo === 'top' ? 0 : 'initial'};
  bottom: ${stickTo === 'bottom' ? 0 : 'initial'};
  width: 100%;
  background: white;
  transition: opacity .2s ease-in-out;
`);

interface StickyPanelProps {
  children: ReactNode | ReactNode[];
  stickTo: 'top' | 'bottom';
};

const StickyPanel = ({ children, stickTo }: StickyPanelProps) => {
  const [showStickyPanel, setShowStickyPanel] = useState(false);
  const [stick, setStick] = useState(false);
  const [yPos, setYpos] = useState(0)
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (null !== stickyRef.current && !stick) {
      setYpos(stickyRef.current.getBoundingClientRect().top);
      setStick(true);
    }

    const handleScroll = debounce(() => {
      if (stickTo === 'top') {
        if (window.scrollY > yPos) {
          if (!showStickyPanel) {
            setShowStickyPanel(true);
          }
        } else if (showStickyPanel) {
          setShowStickyPanel(false);
        }
      } else if (stickTo === 'bottom') {
        console.log(window.scrollY+window.innerHeight, yPos)
        if (window.scrollY + window.innerHeight > yPos) {
          setShowStickyPanel(false);
        } else if (!showStickyPanel) {
          setShowStickyPanel(true);
        }
      }
    }, 50);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [stick, yPos, showStickyPanel, stickTo]);

  return <StyledStickyPanel
    ref={stickyRef}
    show={showStickyPanel}
    stick={stick}
    stickTo={stickTo}
  >
    {children}
  </StyledStickyPanel>
};

export default StickyPanel;
