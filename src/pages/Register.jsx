import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { baseUrl, judul } from '../config/fungsi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate()
  const style = {
    p: {
      fontWeight: "bold",
      color: "red"
    }
  }

  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const onSubmit = async (data) => {
    setisLoading(true)
    try {
      const response = await axios.post(`${baseUrl}register`, data)
      console.log(response.data);
      const hasil = response.data
      alert(hasil.pesan)
      if (hasil.sukses == 1) {
        navigate("/login")
      }
    } catch (error) {
      alert(error)
    } finally {
      setisLoading(false)
    }


    console.log(data)
  };

  useEffect(() => {
    document.title = `Register ${judul}`
  }, []);
  // console.log(errors);
  return (
    <>
      {/* {isLoading.toString()} */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Nama" {...register("txt_nama", { required: true })} /> <br />
        {errors.txt_nama?.type === "required" && (
          <><p role="alert" style={style.p}>First name is required</p></>
        )}
        <input type="text" placeholder="Email" {...register("txt_email", { required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i })} /> <br />
        {errors.txt_email?.type === "required" && (
          <><p role="alert" style={style.p}>Email is required</p></>
        )}
        {errors.txt_email?.type === "pattern" && (
          <> <p role="alert" style={style.p}>Email is required with valid format</p> </>
        )}
        <input type="text" placeholder="Telp" {...register("txt_telp", { required: true, maxLength: 13, minLength: 8, pattern: /^\d*$/i })} /> <br />
        {errors.txt_telp?.type === "required" && (
          <><p role="alert" style={style.p}>Phone is required</p></>
        )}
        {errors.txt_telp?.type === "pattern" && (
          <><p role="alert" style={style.p}>Phone is required to numeric</p></>
        )}
        {errors.txt_telp?.type === "maxLength" && (
          <><p role="alert" style={style.p}>Phone is required up to 13 numbers</p></>
        )}
        {errors.txt_telp?.type === "minLength" && (
          <><p role="alert" style={style.p}>Phone is required at least 8 numbers</p></>
        )}
        <input type="password" placeholder="Password" {...register("txt_password", { required: true })} /> <br />
        {errors.txt_password?.type === "required" && (
          <><p role="alert" style={style.p}>Password is required</p> </>
        )}
        <input type="password" placeholder="Ulangi Password" {...register("Ulangi", { required: true })} /> <br />
        {errors.Ulangi?.type === "required" && (
          <> <p role="alert" style={style.p}>Ulangi Password is required</p></>
        )}
        {watch("Ulangi") !== watch("txt_password") && (
          <> <p role="alert" style={style.p}>Ulangi Password is must same with password</p></>
        )}
        {isLoading ? (<>Loading...</>) : (<button type="submit" >Register</button>)}

      </form>
    </>
  );
}

export default Register;
