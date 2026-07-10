import { createContext, useContext, useEffect, useState } from 'react';
import axios from "axios";
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const navigate = useNavigate();
    const currency = import.meta.env.VITE_CURRENCY;

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [dashboardRefreshTrigger, setDashboardRefreshTrigger] = useState(0);

    const [cars, setCars] = useState([]);

    const refreshDashboard = () => {
        console.log('Dashboard refresh triggered');
        setDashboardRefreshTrigger(prev => prev + 1);
    }

    // function to check if user is logged in 
    const fetchUser = async () => {
        try{
            const { data } = await axios.get('/api/user/data');
            console.log(' User data from server : ', data.user);

            if(data.success)
            {
                setUser(data.user);
                setIsOwner(data.user.role === 'Owner');
                console.log('Is Owner? ', data.user.role === 'Owner');
                console.log('User Role: ', data.user.role);
            }
            else 
            {
                navigate('/');
            }
        }catch(error)
        {
            console.error("Fetch User Error : ", error);
        }
    }

    // function to fetch all cars
    const fetchCars = async () => {
        try{
            const { data } = await axios.get('/api/user/cars');
            data.success ? setCars(data.cars) : toast.error(data.message);
        }catch(error)
        {
            toast.error(error.message);
        }
    }

    // function to log out the user
    const logout = () => {
        localStorage.removeItem('token');

        setToken(null);
        setUser(null);
        setIsOwner(false);
        axios.defaults.headers.common['Authorization'] = ""
        toast.success('You have been logged out..!');
        navigate('/');
    }

    // useEffect to retrive token from localStorage
    useEffect(() => {
        const localToken = localStorage.getItem('token');

        if(localToken)
        {
            setToken(localToken);
        }
        fetchCars()
    },[]);

    // useEffect to fetch user data when token is available
    useEffect(() => {
        if(token)
        {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUser();
        }else 
        {
            axios.defaults.headers.common['Authorization'] = '';
        }
    }, [token])

    const value = {
        navigate, currency, axios, user, setUser, token, setToken, isOwner, setIsOwner, fetchUser, showLogin, setShowLogin, logout, fetchCars, cars, setCars, pickupDate, setPickupDate, returnDate, setReturnDate, 
        dashboardRefreshTrigger, refreshDashboard
    };
    return (
        <AppContext.Provider value={value}>
            { children }
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}