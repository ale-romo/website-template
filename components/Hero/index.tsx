import styled from 'styled-components';

const StyledDiv = styled.div<Props>`
  background-image: url("${(props) => props.backgroundImage}");
  background-size: cover;
  padding: 40px 0 80px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface Props {
  backgroundImage: string;
  children: any;
};
const Hero = ({ backgroundImage, children }: Props) => {
  return <StyledDiv backgroundImage={backgroundImage}>
    {children}
    </StyledDiv>
}

export default Hero;
