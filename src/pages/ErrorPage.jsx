import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { judul } from '../config/fungsi';

const ErrorPage = () => {
    const navigate = useNavigate()
    const kembali = () => {
        navigate(-1)
    }

    useEffect(() => {
        document.title = `Error ${judul}`
    }, []);
    return (
        <div>
            404 ga ketemu <br />
            <a onClick={kembali} className='btn btn-primary'>Kembali</a>
        </div>
    );
}

export default ErrorPage;
