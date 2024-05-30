import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";

const ModalOverlay = styled.div.attrs((props) => ({
    style: {
        display: props.isopen === 'true' ? 'block' : 'none',
    },
}))`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
`;

const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    z-index: 2;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  
    h2 {
      margin: 0;
    }
  
    button {
      padding: 8px;
      cursor: pointer;
    }
`;

const ModalBody = styled.div`
    label {
      display: block;
      margin-bottom: 5px;
    }
  
    input,
    select {
      width: 100%;
      padding: 8px;
      margin-bottom: 15px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
`;

const ModalFooter = styled.div`
    text-align: right;
  
    button {
      padding: 8px 15px;
      cursor: pointer;
      background-color: #4caf50;
      color: #fff;
      border: none;
      border-radius: 4px;
      outline: none;
    }
`;

const EditEmployee = ({ isopen, onClose, employeeId }) => {
    const { editEmployee, getAllJobs } = useGlobalContext();
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phoneNumber: '',
        jobId: '',
        image: null
    });

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const employeeData = await getSingleEmployee(employeeId);
                setFormData({
                    name: employeeData.name || '',
                    surname: employeeData.surname || '',
                    phoneNumber: employeeData.phoneNumber || '',
                    jobId: employeeData.job.id || '',
                    image: null
                });
            } catch (error) {
                console.error(error);
            }
        };

        if (isopen && employeeId) {
            fetchEmployeeData();
        }
    }, [isopen, employeeId]);

    const [jobs, setJobs] = useState([]);

    const fetchJobs = async () => {
        try {
            const response = await getAllJobs();
            setJobs(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        console.log(formData);
        fetchJobs();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            image: e.target.files[0]
        }));
    };

    const handleSave = async () => {
        try {
            const response = await editEmployee(id, formData);
            console.log(response); // Log the response for debugging
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ModalOverlay isopen={isopen} onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <h2 style={{ marginRight: "1.2rem" }}>Edit Employee</h2>
                    <button onClick={onClose}>X</button>
                </ModalHeader>
                <ModalBody>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <label htmlFor="surname">Surname:</label>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                    />
                    <label htmlFor="phoneNumber">Mobile number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                    <label htmlFor="jobId">Select job:</label>
                    <select
                        id="jobId"
                        name="jobId"
                        value={formData.jobId}
                        onChange={handleChange}
                    >
                        <option value="">Select</option>
                        {jobs.map((job) => (
                            <option key={job.id} value={job.id}>
                                {job.name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="imageUrl">Current Image:</label>
                    <img src={`http://localhost:8000${formData.imageUrl}`} style={{ height: "50px", width: "50px" }} alt="" />
                    <input
                        type="file"
                        id="imageUrl"
                        name="imageUrl"
                        onChange={handleImageChange}
                    />
                </ModalBody>
                <ModalFooter>
                    <button onClick={handleSave}>Save</button>
                </ModalFooter>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default EditEmployee;
