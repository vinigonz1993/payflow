import styled from 'styled-components';

const SubmitButton = styled.button`
  width: 100%;
  margin-top: 4px;
  padding: 13px 16px;

  border: 0;
  border-radius: 11px;

  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;

  font-size: 14px;
  font-weight: 650;
  cursor: pointer;

  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.25);

  transition:
    transform 150ms ease,
    box-shadow 150ms ease,
    filter 150ms ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.08);
    box-shadow: 0 14px 30px rgba(79, 70, 229, 0.32);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default SubmitButton;