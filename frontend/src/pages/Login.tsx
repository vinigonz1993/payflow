import { useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import Heading from '../components/Heading';
import Input from '../components/Input';
import { useAppDispatch } from '../app/hooks';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import Field from '../components/Form/Field';
import Label from '../components/Form/Label';
import SubmitButton from '../components/Buttons/SubmitButton';
import { BrandHeader } from '../components/Page';

const InputWrapper = styled.div`
  position: relative;
`;

const PasswordInput = styled(Input)`
  padding-right: 70px;
`;

const TogglePassword = styled.button`
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

const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 13px;
`;

const Remember = styled.label`
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

const Link = styled.a`
  color: #818cf8;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    color: #a5b4fc;
  }
`;


const Register = styled.p`
  margin: 24px 0 0;

  text-align: center;
  color: #6f788b;
  font-size: 13px;
`;

const Footer = styled.p`
  margin: 24px 0 0;

  text-align: center;
  color: #41495b;
  font-size: 11px;
`;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await dispatch(login({ email, password }));

    if (login.fulfilled.match(result)) {
      navigate('/dashboard');
    }
  }
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
        <BrandHeader />
        <Card>
          <Heading>
            <h2>Welcome back</h2>
            <p>Sign in to continue to your account.</p>
          </Heading>

          <Form onSubmit={handleLogin}>
            <Field>
              <Label htmlFor="email">Email address</Label>

              <Input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </Field>

            <Field>
              <Options>
                <Label htmlFor="password">Password</Label>

                <Link href="/forgot-password">
                  Forgot password?
                </Link>
              </Options>

              <InputWrapper>
                <PasswordInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />

                <TogglePassword
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </TogglePassword>
              </InputWrapper>
            </Field>

            <Options>
              <Remember>
                <input type="checkbox" />
                Remember me
              </Remember>
            </Options>

            <SubmitButton type="submit">
              Sign in
            </SubmitButton>
          </Form>

          <Register>
            Don't have an account?{' '}
            <Link href="/register">Create an account</Link>
          </Register>
        </Card>

        <Footer>
          © 2026 PayFlow. Secure payments, simplified.
        </Footer>
    </>
  );
}
