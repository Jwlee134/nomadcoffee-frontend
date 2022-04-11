import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { logUserIn } from "../apollo/vars";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";
import Input from "../components/Input";
import Layout from "../components/Layout";
import {
  CreateAccountMutation,
  LoginMutation,
  useCreateAccountMutation,
  useLoginMutation,
} from "../graphql/generated";

const Form = styled.form``;

const Logo = styled.h3`
  text-align: center;
  font-weight: bold;
  font-size: 48px;
  margin-bottom: 40px;
`;

const ToggleText = styled.span`
  font-size: 14px;
  margin-right: 5px;
`;

const ToggleButton = styled.button`
  all: unset;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
`;

const ErrorText = styled.span`
  display: block;
  color: #ffa4a4;
  margin-bottom: 20px;
  font-weight: 300;
`;

interface FormState {
  username: string;
  password: string;
  email: string;
  name: string;
  error?: string;
}

function isLoginMutation(
  target: CreateAccountMutation | LoginMutation
): target is LoginMutation {
  return (target as LoginMutation).login !== undefined;
}

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm<FormState>();
  const onCompleted = (data: CreateAccountMutation | LoginMutation) => {
    if (!isLoginMutation(data) && data.createAccount?.error) {
      setError("error", { message: `⚠ ${data.createAccount.error}` });
      return;
    }
    if (isLoginMutation(data) && data.login?.error) {
      setError("error", { message: `⚠ ${data.login.error}` });
      return;
    }
    const token = isLoginMutation(data)
      ? data.login?.token
      : data.createAccount?.token;
    if (!token) {
      setError("error", { message: "⚠ Something went wrong. Try again." });
      return;
    }
    logUserIn(token);
  };
  const [signUp, { loading: signUpLoading }] = useCreateAccountMutation({
    onCompleted,
  });
  const [login, { loading: loginLoading }] = useLoginMutation({ onCompleted });

  const loading = signUpLoading || loginLoading;

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
    reset();
  };
  const onValid = ({ username, password, email, name }: FormState) => {
    if (loading) return;
    if (isLogin) {
      login({ variables: { username, password } });
    } else {
      signUp({ variables: { username, password, email, name } });
    }
  };

  return (
    <Layout>
      <AuthLayout>
        <Logo>Nomad Coffee</Logo>
        <Form onSubmit={handleSubmit(onValid)}>
          {isLogin ? (
            <>
              <Input
                onFocus={() => clearErrors("error")}
                register={register("username", {
                  required: "⚠ Username is required.",
                })}
                label="Username"
                id="username"
              />
              {errors.username?.message && (
                <ErrorText>{errors.username.message}</ErrorText>
              )}
              <Input
                onFocus={() => clearErrors("error")}
                register={register("password", {
                  required: "⚠ Password is required.",
                })}
                label="Password"
                id="password"
                type="password"
              />
              {errors.password?.message && (
                <ErrorText>{errors.password.message}</ErrorText>
              )}
            </>
          ) : (
            <>
              <Input
                onFocus={() => clearErrors("error")}
                register={register("username", {
                  required: "⚠ Username is required.",
                })}
                label="Username"
                id="username"
              />
              {errors.username?.message && (
                <ErrorText>{errors.username.message}</ErrorText>
              )}
              <Input
                onFocus={() => clearErrors("error")}
                register={register("email", {
                  required: "⚠ Email is required.",
                })}
                label="Email"
                id="email"
                type="email"
              />
              {errors.email?.message && (
                <ErrorText>{errors.email.message}</ErrorText>
              )}
              <Input
                onFocus={() => clearErrors("error")}
                register={register("name", {
                  required: "⚠ Name is required.",
                })}
                label="Name"
                id="name"
              />
              {errors.name?.message && (
                <ErrorText>{errors.name.message}</ErrorText>
              )}
              <Input
                onFocus={() => clearErrors("error")}
                register={register("password", {
                  required: "⚠ Password is required.",
                })}
                label="Password"
                id="password"
                type="password"
              />
              {errors.password?.message && (
                <ErrorText>{errors.password.message}</ErrorText>
              )}
            </>
          )}
          <Button
            text={loading ? "Loading" : isLogin ? "Login" : "Sign Up"}
            type="submit"
          />
          {errors.error?.message && (
            <ErrorText>{errors.error.message}</ErrorText>
          )}
        </Form>
        <ToggleText>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </ToggleText>
        <ToggleButton onClick={toggleMode}>
          {isLogin ? "Sign Up" : "Login"}
        </ToggleButton>
      </AuthLayout>
    </Layout>
  );
}

export default Login;
