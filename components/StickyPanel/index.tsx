import { ReactNode, useState, useEffect, useLayoutEffect, useRef } from 'react';
import { debounce } from 'lodash';
import styled from 'styled-components';

interface StyledStickyPanelProps {
  show: boolean;
  stick: boolean;
}

const StyledStickyPanel = styled.div<StyledStickyPanelProps>(({
  stick,
  show
}) => `
  opacity: ${show ? 1 : 0};
  position: ${stick ? 'fixed' : 'relative'};
  z-index: 10;
  top: 0;
  width: 100%;
  background: white;
  transition: opacity .2s ease-in-out;
`);

interface StickyPanelProps {
  children: ReactNode | ReactNode[];
};

const StickyPanel = ({children}: StickyPanelProps) => {
  const [showStickyPanel, setShowStickyPanel] = useState(false);
  const [stick, setStick] = useState(false);
  const [yPos, setYpos] = useState(0)
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (null !== stickyRef.current && !stick) {
      setYpos(stickyRef.current.getBoundingClientRect().bottom);
      setStick(true);
    }
    const handleScroll = debounce(() => {
      if (window.scrollY > yPos) {
        if (!showStickyPanel) {
          setShowStickyPanel(true);
        }
      } else if(showStickyPanel) {
        setShowStickyPanel(false);
      }
    }, 50);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [stick, yPos, showStickyPanel]);

  return <StyledStickyPanel ref={stickyRef} show={showStickyPanel} stick={stick}>
      {children}
    </StyledStickyPanel>
};

export default StickyPanel;
