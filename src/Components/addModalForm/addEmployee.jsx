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

const AddEmployee = ({ isopen, onClose }) => {
    const { addEmployee, getAllJobs } = useGlobalContext();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [jobId, setJobId] = useState('');
    const [imageFile, setImageFile] = useState(null);
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
        fetchJobs();
    }, []);

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('surname', surname);
        formData.append('phoneNumber', phoneNumber);
        formData.append('jobId', jobId);
        formData.append('image', imageFile);

        try {
            await addEmployee(formData);
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ModalOverlay isopen={isopen} onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <h2 style={{ marginRight: "1.2rem" }}>Add Employee</h2>
                    <button onClick={onClose}>X</button>
                </ModalHeader>
                <ModalBody>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="surname">Surname:</label>
                    <input
                        type="text"
                        id="surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                    <label htmlFor="phoneNumber">Mobile number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <label htmlFor="jobId">Select job:</label>
                    <select
                        id="jobId"
                        value={jobId}
                        onChange={(e) => setJobId(e.target.value)}
                    >
                        <option value="">Select a job</option>
                        {jobs.map((job) => (
                            <option key={job.id} value={job.id}>
                                {job.name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="imageUrl">Select image:</label>
                    <input
                        type="file"
                        id="imageUrl"
                        onChange={(e) => setImageFile(e.target.files[0])}
                    />
                </ModalBody>
                <ModalFooter>
                    <button onClick={handleSave}>Save</button>
                </ModalFooter>
            </ModalContainer>
        </ModalOverlay>
    );
};

export default AddEmployee;
