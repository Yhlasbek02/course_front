import React, { useState, useMemo, useEffect } from 'react'
import styled from "styled-components";
import { MainLayout } from '../../styles/Layouts'
import Navigation from '../Navigation/Navigation'
import { useNavigate } from 'react-router-dom';
import Topbar from '../Topbar/Topbar';

import Dashboard from '../Dashboard/Dashboard';
import Jobs from '../Jobs/Jobs';
import Employee from '../Employee/Employee';
import Records from '../Records/Records';
function Main() {
    const [active, setActive] = useState(1)
    const navigate = useNavigate();
    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (!storedToken) {
            navigate('/admin/login');
        }
    }, [navigate]);
    const displayData = () => {
        switch (active) {
            case 1:
                return <Dashboard />
            case 2:
                return <Employee />
            case 3:
                return <Records />
            case 4:
                return <Jobs />
            default:
                return <Employee />
        }
    }

    

    return (
        <AppStyled className="App">
            <Topbar />
            <MainLayout>
                <Navigation active={active} setActive={setActive} />
                <main>
                    {displayData()}
                </main>
            </MainLayout>
        </AppStyled>
    );
}

const AppStyled = styled.div`
    main{
      flex: 1;
      border-radius: 32px;
      overflow-x: hidden;
      &::-webkit-scrollbar{
        width: 0;
      }
    }
    body {
        padding: 0;
        margin: 0;
    }
  `;

export default Main;
