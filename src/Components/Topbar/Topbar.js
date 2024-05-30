import React, { useEffect, useRef, useState } from 'react'
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from '../../context/globalContext';
import { signout } from '../../utils/Icons';

export default function Topbar() {
  const { getProfile } = useGlobalContext();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  let isCancelled = useRef(true);


  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      setUserName(response.data.username);
      setEmail(response.data.email)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchProfile();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
    } else {
      if (isCancelled.current) {
        isCancelled.current = false;
      }
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };
  return (
    <TopStyled>
      <i className="fas fa-user-circle"></i>
      <div className='right'>
        <h2>{username}</h2>
        <p>{email}</p>
      </div>

      <div className='left'>
        <li onClick={handleLogout}>
          {signout}
        </li>
      </div>
    </TopStyled>
  );
}

const TopStyled = styled.div`

  display: flex;
  padding: 0.5rem 1rem;
  top: 0;
  width: 100%;
  height: 3.5rem;
  background-color: rgba(77, 159, 255, 0.2);

  i {
    font-size: 2rem;
    padding: 10px;
  }

  h2 {
    font-size: 1rem;
    color: #4D9FFF;
  }
  p {
    font-size: 0.75rem;
  }
  .right {
    flex-grow: 1;
  }

  .left {
    float: left; /* Change to "float: right" for Sign Out on right */
  }

  body {
    font-family: sans-serif;
  }
  li {
    cursor: pointer;
  }
`;
