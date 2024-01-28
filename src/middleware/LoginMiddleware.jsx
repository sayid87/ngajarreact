import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginMiddleware = ({ children }) => {
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("dataLogin") == null) {
            navigate("/")
        }
    }, []);

    return (
        <>
            {children}
        </>
    );
}

export default LoginMiddleware;