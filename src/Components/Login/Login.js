import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {useGlobalContext} from "../../context/globalContext";

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  width: 350px;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3.5rem;
  color: #4D9FFF;
  font-family: "Playfair Display", Garamond, serif; /* List preferred fonts first */
  font-weight: bold; 
`;

const InputField = styled.input`
  color: #4D9FFF;
  width: 100%;
  margin: 10px 0;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #4D9FFF;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
  background-color: rgba(77, 159, 255, 0.1); /* Add background color with 10% opacity */

  &:focus {
    border-color: #3498db;
  }
  &::placeholder {
    color: #4D9FFF
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 18px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #258cd1;
  }
`;

const RegisterLink = styled.p`
  margin-top: 10px;
  margin-bottom: 20px;
  text-align: center;
  color: #555;

  a {
    color: #3498db;
    text-decoration: none;
    font-size: 1rem;
    font-weight: bold;
  }
`;

function App() {
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useGlobalContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await login(username, password);
      if (response) {
        setName('');
        setPassword('');
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleLogin}>
        <Title>Yukle</Title>
        <InputField
          value={username}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Username"
        />
        <InputField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <RegisterLink>
          <Link to="/forgot-password">Forgot password? </Link>
        </RegisterLink>
        <SubmitButton type="submit">Login</SubmitButton>
      </LoginForm>
    </LoginContainer>
  );
}

export default App;
