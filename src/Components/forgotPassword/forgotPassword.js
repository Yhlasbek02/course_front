import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  color: #4D9FFF;
  font-family: "Playfair Display", Garamond, serif; /* List preferred fonts first */
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

const InputField = styled.input`
  color: #4D9FFF;
  width: 80%;
  margin: 10px 0;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #4D9FFF;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
  background-color: rgba(77, 159, 255, 0.1); /* Add background color with 10% opacity */
  margin-bottom: 2.5rem;

  &:focus {
    border-color: #3498db;
  }
  &::placeholder {
    color: #4D9FFF
  }
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
  &:hover {
    background-color: #258cd1;
  }
`;



export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const {forgotPassword} = useGlobalContext();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        const isSuccess = await forgotPassword(email);
        if (isSuccess) {
          setEmail('');
          navigate('/verify')
        }
      } catch (error) {
        console.error(error);
      }
    }
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Title>Input admin email, then we will send you a verification code</Title>
                <InputField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type='text'
                    placeholder='Type email ...'
                />
                <SubmitButton type='submit'>Next</SubmitButton>
            </Form>
        </Container>

    )
}
