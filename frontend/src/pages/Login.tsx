import { useState } from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Heading from '../components/Heading';
import { useAppDispatch } from '../app/hooks';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import Field from '../components/Form/Field';
import Label from '../components/Form/Label';
import SubmitButton from '../components/Buttons/SubmitButton';
import { BrandHeader } from '../components/Page';
import { toast } from 'react-toastify';
import {
  InputWrapper,
  PasswordInput,
  TogglePassword,
  Options,
  Remember,
  AuthLink,
  RegisterPrompt,
  AuthFooter,
} from '../components/auth/AuthStyles';

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
    if (login.rejected.match(result)) {
      toast.error('Login failed. Please check your credentials and try again.');
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

              <InputWrapper>
                <Input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
              </InputWrapper>
            </Field>

            <Field>
              <Options>
                <Label htmlFor="password">Password</Label>

                <AuthLink href="/forgot-password">
                  Forgot password?
                </AuthLink>
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

          <RegisterPrompt>
            Don't have an account?{' '}
            <AuthLink href="/register">Create an account</AuthLink>
          </RegisterPrompt>
        </Card>

        <AuthFooter>
          © 2026 PayFlow. Secure payments, simplified.
        </AuthFooter>
    </>
  );
}
