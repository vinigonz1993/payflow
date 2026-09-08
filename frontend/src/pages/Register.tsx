import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../components/Card';
import Heading from '../components/Heading';
import Input from '../components/Input';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { register } from '../features/auth/authSlice';
import Form from '../components/Form';
import Field from '../components/Form/Field';
import Label from '../components/Form/Label';
import SubmitButton from '../components/Buttons/SubmitButton';
import { BrandHeader } from '../components/Page';

const ErrorMessage = styled.p`
  margin: 0;
  color: #f87171;
  font-size: 13px;
`;


const Footer = styled.p`
  margin: 24px 0 0;
  text-align: center;
  color: #6f788b;
  font-size: 13px;
`;

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== confirmPassword) {
      return;
    }

    const result = await dispatch(register({ email, password }));

    if (register.fulfilled.match(result)) {
      navigate('/dashboard');
    }
  }

  return (
    <>
        <BrandHeader />
        <Card>
          <Heading>
            <h2>Create your account</h2>
            <p>Get started with PayFlow.</p>
          </Heading>

          <Form onSubmit={handleSubmit}>
            <Field>
              <Label htmlFor="email">Email address</Label>

              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </Field>

            <Field>
              <Label htmlFor="password">Password</Label>

              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 8 characters"
                autoComplete="new-password"
                required
              />
            </Field>

            <Field>
              <Label htmlFor="confirm-password">
                Confirm password
              </Label>

              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                placeholder="Enter your password again"
                autoComplete="new-password"
                required
              />
            </Field>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <SubmitButton type="submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </SubmitButton>
          </Form>

          <Footer>
            Already have an account?{' '}
            <Link to="/login">Sign in</Link>
          </Footer>
        </Card>
    </>
  );
}
