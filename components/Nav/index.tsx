import Link from 'next/link';
import styled from 'styled-components';

const StyledList = styled.ul`
  display: flex;
  list-style: none;
  flex-direction: row;
  align-content: space-around;
  padding-left: 0;
  margin: 40px 0 0;
  column-gap: 15px;
  a {
    text-decoration: none;
    color: #FFFAF8;
    text-transform: uppercase;
    font-size: 1.2rem;
    font-family: 'Nunito Sans', sans-serif;
    padding: 5px 10px;
    &:hover {
      background-color: rgba(255, 95, 111, .7);
    }
  }
`;

const Banner = () => {
  return <StyledList>
    <li><Link href="#concepto">Concepto</Link></li>
    <li><Link href="#habitaciones" scroll={true}>Habitaciones</Link></li>
    <li><Link href="#jardin">Jardin</Link></li>
    <li><Link href="#actividades">Actividades</Link></li>
    </StyledList>
}

export default Banner;
