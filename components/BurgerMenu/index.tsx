import { FC, ReactNode, useState, useEffect } from 'react';
import styled from 'styled-components';

interface StyledButtonProps {
  active?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>(({
  active
}) =>`
  width: 22px;
  height: 22px;
  margin: 5px;
  display: block;
  position: relative;
  border: none;
  background: none;
  cursor: pointer;
  z-index: 11;
  &:before, &:after {
    content: '';
    width: 20px;
    height: 4px;
    position: absolute;
    border-radius: 2px;
    background-color: black;
    left: ${active ? '2px' : 0};
    transition: all .5s;
  }
  &:before {
    top: ${active ? '9px' : '5px'};
    transform: ${active ? 'rotate(45deg)' : 'initial'};
  }
  &:after {
    bottom: ${active ? '9px' : '5px'};
    transform: ${active ? 'rotate(-45deg)' : 'initial'};
  }
`);


interface StyledBurgerMenuProps {
  backgroundColor?: string;
  color?: string;
  opened: boolean;
}

const StyledBurgerMenu = styled.div<StyledBurgerMenuProps>(({
  opened,
  backgroundColor,
}) => `
  display: block;
  position: fixed;
  overflow: scroll;
  width: 100%;
  height: 100%;
  z-index: 10;
  top: 0;
  transition: all .5s;
  left: ${opened ? 0 : '-100%'};
  background-color: ${backgroundColor || 'white'};
`);

interface BurgerMenuProps {
  children: ReactNode;
  showBurger: boolean;
  backgroundColor?: string;
}

const BurgerMenu: FC<BurgerMenuProps> = ({ children, showBurger, backgroundColor }) => {
  const [opened, setOpened] = useState(false);

  const toggleBurgerMenu = () => {
    setOpened(!opened)
  }

    useEffect(()  => {
      if(opened) {
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.body.style.overflow = "auto";
      };
  });
  if(showBurger) {
    return <>
    <StyledButton onClick={() => toggleBurgerMenu()} active={opened}/>
    <StyledBurgerMenu opened={opened} backgroundColor={backgroundColor}>
      {children}
    </StyledBurgerMenu>
  </>
  }

  return <>{children}</>
}

export default BurgerMenu;
