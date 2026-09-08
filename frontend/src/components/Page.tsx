import type { ReactNode } from 'react';
import styled from 'styled-components';
import Container from './Container';

const StyledPage = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  background:
    radial-gradient(
      circle at 15% 20%,
      rgba(99, 102, 241, 0.18),
      transparent 30%
    ),
    radial-gradient(
      circle at 85% 80%,
      rgba(79, 70, 229, 0.12),
      transparent 30%
    ),
    #080b14;
`;


const Brand = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const Logo = styled.div`
  width: 52px;
  height: 52px;
  margin: 0 auto 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 16px;
  background: linear-gradient(135deg, #6366f1, #4f46e5);

  color: white;
  font-size: 22px;
  font-weight: 800;
`;

const BrandName = styled.h1`
  margin: 0;
  color: #fff;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -0.04em;
`;

const Subtitle = styled.p`
  margin: 8px 0 0;
  color: #8b93a7;
  font-size: 14px;
`;

interface PageProps {
  children: ReactNode;
}

export const BrandHeader = () => (
  <Brand>
    <Logo>$</Logo>
    <BrandName>PayFlow</BrandName>
    <Subtitle>Payments made simple.</Subtitle>
  </Brand>
);

const Page = ({ children }: PageProps) => {
  return (
    <StyledPage>
      <Container>
        {children}
        </Container>
    </StyledPage>
  );
};

export default Page;