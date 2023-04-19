import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import jwt from "jsonwebtoken";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
`;

export const Logo = styled.img`
  margin-bottom: 50px;
`;

export const Form = styled.form`
  width: 475px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Input = styled.input`
  width: 475px;
  height: 58px;
  background: #ffffff;
  border: 1px solid #f3f3f3;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #3d4866;
  outline: none;
  padding: 0 20px;
  margin-bottom: 20px;
  transition: border 0.3s ease-in-out;

  &::placeholder {
    color: #b0b7c3;
  }

  &:focus {
    border: 1px solid #3d4866;
  }
`;

export const Button = styled.button`
  width: 475px;
  height: 58px;
  border: none;
  outline: none;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
  background: linear-gradient(91.06deg, #6e69cd 0.26%, #19b8ac 101.32%);
  transition: all 0.3s ease-in-out;

  &:hover {
    background: linear-gradient(272.06deg, #6e69cd 0.26%, #19b8ac 101.32%);
  }
`;

export const LoginPropOne = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  user-select: none;
  pointer-events: none;
`;

export const LoginPropTwo = styled.img`
  position: absolute;
  bottom: 10%;
  left: 0;
  user-select: none;
  pointer-events: none;
`;

export const LoginPropThree = styled.img`
  position: absolute;
  top: 10%;
  right: 0;
  user-select: none;
  pointer-events: none;
`;

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.token && data.refreshToken) {
          const { token, refreshToken } = data;
          const { isAdmin } = data.user;

          if (isAdmin) {
            //set cookie for token
            document.cookie = `token=${data.token}; path=/; max-age=3600`;
            document.cookie = `refreshToken=${data.refreshToken}; path=/; max-age=3600`;
            toast.success("Login successful");
            window.location.href = "/dashboard";
          } else {
            toast.error("Invalid credentials");
          }
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <Container>
      <LoginPropOne src="/images/login-prop-1.svg" />
      <LoginPropTwo src="/images/login-prop-2.svg" />
      <LoginPropThree src="/images/login-prop-3.svg" />
      <Logo src="/images/logo.svg" />
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="email"
          value={email}
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button>Login</Button>
      </Form>
    </Container>
  );
};

//initialProps
export async function getServerSideProps(context) {
  const { req, res } = context;
  const token = req.cookies.token;

  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { isAdmin, exp } = decoded;

    if (isAdmin && exp > Date.now() / 1000) {
    }
    {
      res.writeHead(302, { Location: "/dashboard" });
      res.end();
    }
  }
  return {
    props: {},
  };
}

export default login;
