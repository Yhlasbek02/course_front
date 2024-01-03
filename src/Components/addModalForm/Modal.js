import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

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


const AddCountryModal = ({ isopen, onClose}) => {
  const {addCountry} = useGlobalContext();
  const [english, setEnglish] = useState('');
  const [russian, setRussian] = useState('');
  const [turkish, setTurkish] = useState('');

  const handleSave = async () => {
    await addCountry(english, russian, turkish);
    console.log(english, russian, turkish);
    setEnglish('');
    setRussian('');
    setTurkish('');

    // Close the modal
    console.log('Added country');
    onClose();
  };

  return (
    <ModalOverlay isopen={isopen} onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2 style={{marginRight: "1.2rem"}}>Add Country</h2>
          <button onClick={onClose}>X</button>
        </ModalHeader>
        <ModalBody>
          <label htmlFor="english">English:</label>
          <input
            type="text"
            id="english"
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
          />
          <label htmlFor="russian">Russian:</label>
          <input
            type="text"
            id="russian"
            value={russian}
            onChange={(e) => setRussian(e.target.value)}
          />
          <label htmlFor="turkish">Turkish:</label>
          <input
            type="text"
            id="turkish"
            value={turkish}
            onChange={(e) => setTurkish(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <button onClick={handleSave}>Save</button>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};


export default AddCountryModal;
