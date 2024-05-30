import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useGlobalContext } from '../../context/globalContext';
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;
  font-weight: bold;
  color: #4D9FFF;
  font-family: "Playfair Display", Garamond, serif;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  width: 500px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InputContainer = styled.div`
  position: relative;
  width: 70%;
  margin: 10px 0;
`;

const InputField = styled.input`
  color: #4D9FFF;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #4D9FFF;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.3s;
  background-color: rgba(77, 159, 255, 0.1);

  &:focus {
    border-color: #3498db;
  }
  &::placeholder {
    color: #4D9FFF;
  }
`;

const EyeIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const SubmitButton = styled.button`
  width: 30%;
  padding: 12px;
  font-size: 18px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;

  &:hover {
    background-color: #258cd1;
  }
`;

export default function ChangePassword() {
  const [password, setPassword] = useState('');
  const [password_conf, setPassword_Conf] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {changePassword} = useGlobalContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const isSuccess = await changePassword(password, password_conf);
      if (isSuccess) {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Create new password</Title>
        <InputContainer>
          <InputField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            placeholder='Type password ...'
          />
          <EyeIcon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </EyeIcon>
        </InputContainer>
        <InputContainer>
          <InputField
            value={password_conf}
            onChange={(e) => setPassword_Conf(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            placeholder='Confirm password ...'
          />
          <EyeIcon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </EyeIcon>
        </InputContainer>
        <SubmitButton type='submit'>Next</SubmitButton>
      </Form>
    </Container>
  );
}
