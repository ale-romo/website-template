import { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';

interface StyledButtonProps {
  active?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  width: 22px;
  height: 22px;
  padding: 0;
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
    left: ${props => props.active ? '2px' : 0};
    transition: all .5s;
  }
  &:before {
    top: ${props => props.active ? '9px' : '5px'};
    transform: ${props => props.active ? 'rotate(45deg)' : 'initial'};
  }
  &:after {
    bottom: ${props => props.active ? '9px' : '5px'};
    transform: ${props => props.active ? 'rotate(-45deg)' : 'initial'};
  }
`


interface StyledBurgerMenuProps {
  backgroundColor?: string;
  color?: string;
  opened: boolean;
}

const StyledBurgerMenu = styled.div<StyledBurgerMenuProps>`
  display: block;
  position: fixed;
  overflow: scroll;
  width: 100%;
  height: 100%;
  z-index: 10;
  top: 0;
  left: ${props => props.opened ? 0 : '-100%'};
  background-color: ${props => props.backgroundColor ? props.backgroundColor : 'white'};
  color: ${props => props.color ? props.color : 'black'};

`;

interface BurgerMenuProps {
  children: ReactNode;
  showBurger: boolean;
}

const BurgerMenu: FC<BurgerMenuProps> = ({children, showBurger}) => {
  const [opened, setOpened] = useState(false);

  const toggleBurgerMenu = () => {
    setOpened(!opened)
  }
  if(showBurger) {
    return <>
    <StyledButton onClick={() => toggleBurgerMenu()} active={opened}/>
    <StyledBurgerMenu opened={opened}>
      {children}
    </StyledBurgerMenu>
  </>
  }

  return <>{children}</>
}

export default BurgerMenu;
