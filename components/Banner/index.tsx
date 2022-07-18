import { FC } from 'react';
import styled from 'styled-components';

const StyledBanner = styled.div<BannerProps>(({
  backgroundColor,
  color,
}) =>`
  background-color: #FF5F6F;
  color: white;
  font-size: 1em;
  background-size: cover;
  padding: 15px 40px;
  width: 100%;
  display: flex;
  justify-content: center;
`);

interface BannerProps {
  children: any;
  backgroundColor?: string;
  color?: string;
};
const Banner: FC<BannerProps> = ({ children, backgroundColor, color }) => {
  return <StyledBanner backgroundColor={backgroundColor} color={color}>
    {children}
    </StyledBanner>
}

export default Banner;
