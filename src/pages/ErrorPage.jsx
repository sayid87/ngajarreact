import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate()
    const kembali = ()=>{
        navigate(-1)
    }
    return (
        <div>
            404 ga ketemu <br />
            <a onClick={kembali} className='btn btn-primary'>Kembali</a>
        </div>
    );
}

export default ErrorPage;
