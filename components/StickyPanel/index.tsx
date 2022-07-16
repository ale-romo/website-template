import { ReactNode, useState, useEffect } from 'react';
import { debounce } from 'lodash';
import styled from 'styled-components';

interface StyledStickyPanelProps {
  show: boolean;
}

const StyledStickyPanel = styled.div<StyledStickyPanelProps>`
  opacity: ${props => props.show ? 1 : 0};
  position: fixed;
  top: 0;
  width: 100%;
  background: white;
  transition: opacity .2s ease-in-out;
`;

interface StickyPanelProps {
  children: ReactNode | ReactNode[];
  yShow: number;
};

const StickyPanel = ({children, yShow}: StickyPanelProps) => {
  const [showStickyPanel, setShowStickyPanel] = useState(false);

  useEffect(() => {
    const handleScroll = debounce(() => {
      console.log('wtf')
      if (window.scrollY > yShow) {
        setShowStickyPanel(true);
      } else {
        setShowStickyPanel(false);
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return <StyledStickyPanel show={showStickyPanel}>
      {children}
    </StyledStickyPanel>
};

export default StickyPanel;
