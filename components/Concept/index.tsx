import styled from 'styled-components';

const StyledSection = styled.section`
  background-color: #FFFAF8;
  display: flex;
  margin: -40px 3rem 0 3rem;
  padding: 40px 90px;
  flex-direction: column;
`;

const StyledTitle = styled.h1`
  color: #FF006F;
  text-align: center;
  font-size: 2.6rem;
  margin: 0;
`
const StyledText = styled.p`
  text-align: center;
  font-size: 1.4rem;
  color: #00585B;
`
const Banner = () => {
  return <StyledSection>
    <StyledTitle>
      A very nice title goes here
    </StyledTitle>
    <StyledText>
      Followed by a sweet summary of what we’re all about. Something about how we bring together convenience, style and passion.
    </StyledText>

  </StyledSection>
}

export default Banner;
