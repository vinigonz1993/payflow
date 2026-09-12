import styled from 'styled-components';
import Input from '../Input';

export const InputWrapper = styled.div`
  position: relative;
`;

export const PasswordInput = styled(Input)`
  padding-right: 70px;
`;

export const TogglePassword = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);

  border: 0;
  background: transparent;

  color: #737c90;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: #aeb6c8;
  }
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
`;

export const Remember = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;

  color: #858da0;
  cursor: pointer;

  input {
    width: 15px;
    height: 15px;
    accent-color: #6366f1;
    cursor: pointer;
  }
`;

export const AuthLink = styled.a`
  color: #818cf8;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    color: #a5b4fc;
  }
`;

export const RegisterPrompt = styled.p`
  margin: 24px 0 0;
  text-align: center;
  color: #6f788b;
  font-size: 13px;
`;

export const AuthFooter = styled.p`
  margin: 24px 0 0;
  text-align: center;
  color: #41495b;
  font-size: 11px;
`;

export const ErrorMessage = styled.p`
  margin: 0;
  color: #f87171;
  font-size: 13px;
`;
