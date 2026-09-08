import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 13px 14px;

  border: 1px solid #293044;
  border-radius: 11px;
  outline: none;

  background: #0c101b;
  color: #fff;
  font-size: 14px;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.12);
  }

  &::placeholder {
    color: #4f586c;
  }
`;

export default Input;