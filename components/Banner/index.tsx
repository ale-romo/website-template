import styled from 'styled-components';

const StyledDiv = styled.div<Props>`
  background-color: #FF5F6F;
  color: white;
  font-size: 1em;
  background-size: cover;
  padding: 15px 40px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

interface Props {
  children: any;
};
const Banner = ({ children }: Props) => {
  return <StyledDiv>
    {children}
    </StyledDiv>
}

export default Banner;
