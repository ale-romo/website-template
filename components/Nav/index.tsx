import Link from 'next/link';
import styled from 'styled-components';

interface NavProps {
  uncollapsed?: boolean;
  color?: string;
  backgroundColor?: string;
}
const StyledList = styled.ul<NavProps>`
  display: flex;
  list-style: none;
  flex-direction: row;
  align-content: space-around;
  flex-wrap: wrap;
  padding-left: 0;
  margin: 0;
  column-gap: 15px;
  row-gap: 10px;
  li {
    display: flex;
    flex-grow: 1;
    justify-content: center;
  }
  a {
    text-decoration: none;
    color: ${props => props.color ? props.color : '#FFFAF8'};
    text-transform: uppercase;
    font-size: 1.2rem;
    font-family: 'Nunito Sans', sans-serif;
    padding: 5px 10px;
    &:hover {
      background-color: ${props => props.backgroundColor ? props.backgroundColor : 'rgba(255, 95, 111, .7)'};
    }
  }
`;

const Nav= ({ uncollapsed, color, backgroundColor }: NavProps)=> {
  return <StyledList uncollapsed={uncollapsed} color={color} backgroundColor={backgroundColor}>
    <li><Link href="#concepto">Concepto</Link></li>
    <li><Link href="#habitaciones" scroll={true}>Habitaciones</Link></li>
    <li><Link href="#jardin">Jardin</Link></li>
    <li><Link href="#actividades">Actividades</Link></li>
    </StyledList>
}

export default Nav;
