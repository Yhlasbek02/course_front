import React, { useEffect, useState } from 'react'
import { InnerLayout } from '../../styles/Layouts'
import styled from 'styled-components'
import { trash, edit, left, right, get } from '../../utils/Icons';
import AddEmployee from '../addModalForm/addEmployee';
import { useGlobalContext } from '../../context/globalContext';
export default function Employee() {
    const [isAddModal, setAddModal] = useState(false);
    const { getEmployee } = useGlobalContext();
    const [currentPage, setCurrentPage] = useState(1);
    const [startIndex, setStartIndex] = useState(1);
    const [search, setSearch] = useState('');
    const [employee, setEmployee] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);


    useEffect(() => {
        fetchEmployee(currentPage, search);
    }, [currentPage, search])


    const fetchEmployee = async (page, search) => {
        try {
            const response = await getEmployee(page, search);
            setEmployee(response.data.employees);
        } catch (error) {
            console.error(error);
        }
    }
    const handlePageChange = async (newPage) => {
        setCurrentPage(newPage);
        setStartIndex((newPage - 1) * 10 + 1);
        try {
            await getEmployee(newPage, '');

        } catch (error) {
            console.error(error);
        }
    };

    const openAddModal = () => {
        setAddModal(true);
    };
    const closeAddModal = async () => {
        setAddModal(false);
        fetchEmployee(currentPage, search);
    };
    return (
        <InnerLayout>
            <UserStyled>
                <button onClick={openAddModal}>Add Employee</button>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Mobile number</th>
                            <th>Job</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee.map((employee, index) => {
                            const id = index + startIndex;
                            const job = employee.job.name || '';
                            
                            return (
                                <tr key={id}>
                                    <td>{id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.surname}</td>
                                    <td>{employee.phoneNumber}</td>
                                    <td>{job}</td>
                                    <td>
                                        <img src={`http://localhost:8000${employee.imageUrl}`} style={{height: "50px", width: "50px"}} alt="" />
                                    </td>
                                    <td>
                                        {trash} {edit} {get}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </UserStyled>
            <AddEmployee
                isopen={isAddModal.toString()}
                onClose={closeAddModal}
            />
        </InnerLayout>
    )
}


const UserStyled = styled.div`
    .addForm {
      display: flex;
      width: 75%;
      margin-bottom: 1rem;
    }
    .addForm input {
      width: 33%;
      height: 30px;
      margin-right: 10px;
      border-radius: 4px;
      padding: 0.5rem;
    }
    .pagination {
      justify-content: center;
      align-items: center;
    }
    span {
        padding: 0 0.5rem;
        margin-top: 1rem;
        font-weight: bold;
        font-size: 1.2rem;
        color: #000;
        margin-bottom: 1rem;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 0.6rem;
    }

    th, td {
      font-size: 0.85rem;
        padding: 0.55rem;
        text-align: left;
        border: 1px solid #ddd;
    }

    th {
        background-color: #f2f2f2;
    }

    td {
      widht: 20%
    }
    tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    tr:hover {
        background-color: #f0f0f0;
    }

    p {
        margin-top: 1rem;
        font-size: 1rem;
    }

    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.75rem;
    }

    button {
        padding: 0.5rem 1rem;
        cursor: pointer;
        background-color: #4caf50;
        color: #fff;
        border: none;
        border-radius: 4px;
        outline: none;
        &:disabled {
            background-color: #ccc;
            cursor: not-allowed;
        }
    }
`;

