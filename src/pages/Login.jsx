import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { baseUrl, judul } from '../config/fungsi';
import { LoginContext } from '../context/LoginContext';

const Login = () => {
    const [isLoading, setisLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate()
    const { dataLogin, setDataLogin } = useContext(LoginContext);
    const onSubmit = async (data) => {
        console.log(data)
        setisLoading(true)
        try {
            const response = await axios.post(`${baseUrl}login`, data)
            console.log(response.data);
            const hasil = response.data
            alert(hasil.pesan)
            if (hasil.sukses == 1) {
                localStorage.setItem("dataLogin", JSON.stringify(hasil.data))
                setDataLogin(hasil.data)
                navigate("/home")
            }
        } catch (error) {
            alert(error)
        } finally {
            setisLoading(false)
        }
    }

    const style = {
        p: {
            fontWeight: "bold",
            color: "red"
        }
    }

    useEffect(() => {
        document.title = `Login ${judul}`
    }, []);
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <input type="text" placeholder="Email" {...register("txt_email", { required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i })} /> <br />
                {errors.txt_email?.type === "required" && (
                    <><p role="alert" style={style.p}>Email is required</p></>
                )}
                {errors.txt_email?.type === "pattern" && (
                    <> <p role="alert" style={style.p}>Email is required with valid format</p> </>
                )}

                <input type="password" placeholder="Password" {...register("txt_password", { required: true })} /> <br />
                {errors.txt_password?.type === "required" && (
                    <><p role="alert" style={style.p}>Password is required</p> </>
                )}

                {isLoading ? (<>Loading...</>) : (<button type="submit" >Login</button>)}

            </form>
        </>
    );
}

export default Login;
