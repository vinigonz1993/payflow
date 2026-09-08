import styled from 'styled-components';

const Card = styled.div`
  padding: 32px;

  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 20px;

  background: rgba(17, 22, 35, 0.9);
  box-shadow:
    0 25px 60px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);

  backdrop-filter: blur(20px);
`;

export default Card;