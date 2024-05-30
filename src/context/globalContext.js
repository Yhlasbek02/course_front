import React, { useContext, useState } from "react"
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const BASE_URL = "http://localhost:8000/api/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {

    const login = async (username, password) => {
        try {
            const response = await axios.post(`${BASE_URL}admin/login`, { username, password })
            if (response.status) {
                localStorage.setItem('token', response.data.data);
                toast.success(response.data.message);
                return true;
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Server error');
            }
        }
    }

    const loginUser = async (phoneNumber, password) => {
        try {
            const response = await axios.post(`${BASE_URL}user/login`, { phoneNumber, password })
            if (response && response.data.token) {
                localStorage.setItem('token', response.data.token);
                toast.success(response.data.message);
                return true;
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Server error');
            }
        }
    }

    const logout = async () => {
        try {
            localStorage.removeItem('token');
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Server error');
            }
        }
    }

    const forgotPassword = async (email) => {
        try {
            const response = await axios.post(`${BASE_URL}admin/forgot-password`, { email })
            if (response.data) {
                toast.success(response.data.message);
                return true;
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Server error');
            }
        }
    }

    const verifyCode = async (otp) => {
        try {
            const response = await axios.post(`${BASE_URL}admin/verify`, { otp })
            if (response.data) {
                console.log(response.data);
                localStorage.setItem('token', response.data.data.token);
                toast.success(response.data.message);
                return true;
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Server error');
            }
        }
    }

    const getProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}admin/profile`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            return response.data;
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Server error');
            }
        }
    }

    const getUserProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}user/profile`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            return response.data;
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Server error');
            }
        }
    }

    const changePassword = async (password, password_conf) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${BASE_URL}admin/change-password`, { password, password_conf },
                {
                    headers: {
                        'authorization': `Bearer ${token}`
                    }
                }
            )
            return response.data;
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Server error');
            }
        }
    }

    const changeUserPassword = async (password, password_conf) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${BASE_URL}user/change-password`, { password, password_conf },
                {
                    headers: {
                        'authorization': `Bearer ${token}`
                    }
                }
            )
            return response.data;
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Server error');
            }
        }
    }

    const getJobs = async (page) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}admin/jobs?page=${page}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            return response.data;
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Server error');
            }
        }
    }

    const getAllJobs = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}admin/all-jobs`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            return response.data;
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Server error');
            }
        }
    }

    const addJob = async (job) => {
        try {
            const response = await axios.post(`${BASE_URL}admin/job/add`, {job}, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            return response.data;
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Server error');
            }
        }
    }

    const editJob = async (id, name) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${BASE_URL}admin/job/edit/${id}`, {name}, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            return response.data;
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Server error');
            }
        }
    }

    const deleteJob = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${BASE_URL}admin/job/delete/${id}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            return response.data;
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Server error');
            }
        }
    }

    const getEmployee = async (page, search) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}admin/employee?page=${page}&search=${search}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            return response.data
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Server error');
            }
        }
    }

    const addEmployee = async (formData) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}admin/employee/add`, formData, {headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }})
            return response.data;
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                console.error(error);
                toast.error('Server error');
            }
        }
    }

    const editEmployee = async (id, formData) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(`${BASE_URL}admin/employee/edit/${id}`, formData, {headers: {
                'authorization': `Bearer ${token}`
            }})
            return response.data;
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Server error');
            }
        }
    }

    const deleteEmployee = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${BASE_URL}admin/employee/delete/${id}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            if (response.status) {
                toast.success(response.data.message);
                return true;
            }
            
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Server error');
            }
        }
    }

    const getSingleEmployee = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${BASE_URL}admin/employee/${id}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            return response.data;
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Server error');
            }
        }
    }

    const getRecords = async (page, type) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}admin/records?page=${page}&type=${type}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            return response.data;
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Server error');
            }
        }
    }

    const getSingleUserRecords = async (id, type) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}admin/get-records/${id}?type=${type}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            return response.data;
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Server error');
            }
        }
    }

    const getUserRecords = async (page, type) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${BASE_URL}user/records?type=${type}&page=${page}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            return response.data;
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Server error');
            }
        }
    }

    const recordIncome = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}user/record-in`, {}, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            return response.data;
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Server error');
            }
        }
    }

    const recordOutcome = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}user/record-out`, {}, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            return response.data;
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Server error');
            }
        }
    }



    return (
        <GlobalContext.Provider value={{
            login,
            logout,
            changePassword,
            verifyCode,
            getProfile,
            forgotPassword,
            addEmployee,
            addJob,
            editJob,
            editEmployee,
            getEmployee,
            getJobs,
            getSingleEmployee,
            getUserRecords,
            getRecords,
            deleteEmployee,
            deleteJob,
            loginUser,
            getUserProfile,
            changeUserPassword,
            recordIncome,
            recordOutcome,
            getSingleUserRecords,
            getAllJobs
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}