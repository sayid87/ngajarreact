import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl, judul } from '../config/fungsi';

const Ubah = () => {

    let { id } = useParams();
    const [isLoading, setisLoading] = useState(false);
    const [detailMember, setdetailMember] = useState(null);
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const style = {
        p: {
            fontWeight: "bold",
            color: "red"
        }
    }

    const loadData = async () => {
        setisLoading(true)
        try {
            const response = await axios.get(`${baseUrl}users/${id}`)
            const hasil = response.data
            setdetailMember(hasil.data)
        } catch (error) {
            alert(error)
        } finally {
            setisLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, []);

    const onSubmit = async (data) => {
        setisLoading(true)
        try {
            const response = await axios.post(`${baseUrl}users/${id}`, data)
            console.log(response.data);
            const hasil = response.data
            alert(hasil.pesan)
            if (hasil.sukses == 1) {
                navigate("/home")
            }
        } catch (error) {
            alert(error)
        } finally {
            setisLoading(false)
        }

    }

    useEffect(() => {
        document.title = `Ubah Member ${judul}`
    }, []);
    return (
        <>
            {isLoading || detailMember == null ? (<>Loading</>) : (<>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder="Nama" {...register("txt_nama", { required: true })} defaultValue={detailMember.nama} /> <br />
                    {errors.txt_nama?.type === "required" && (
                        <><p role="alert" style={style.p}>First name is required</p></>
                    )}

                    {errors.txt_email?.type === "pattern" && (
                        <> <p role="alert" style={style.p}>Email is required with valid format</p> </>
                    )}
                    <input type="text" placeholder="Telp" {...register("txt_telp", { required: true, maxLength: 13, minLength: 8, pattern: /^\d*$/i })} defaultValue={detailMember.telp} /> <br />
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

                    {isLoading ? (<>Loading...</>) : (<button type="submit" >Ubah</button>)}

                </form>
            </>)}

        </>
    );
}

export default Ubah;
