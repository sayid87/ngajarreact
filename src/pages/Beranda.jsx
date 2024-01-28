import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../config/fungsi';
import { Link } from 'react-router-dom';

const Beranda = () => {
    const [isLoading, setisLoading] = useState(false);
    const [dataMember, setdataMember] = useState(null);

    const loadData = async () => {
        setisLoading(true)
        try {
            const response = await axios.get(`${baseUrl}users`)
            const hasil = response.data
            setdataMember(hasil.data)
        } catch (error) {
            alert(error)
        } finally {
            setisLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, []);

    const hapusData = async (id, nama) => {
        const yakin = confirm(`Apakah Anda yakin ingin menghapus ${nama}?`)
        if (yakin) {
            setisLoading(true)
            try {
                const response = await axios.delete(`${baseUrl}users/${id}`)
                const hasil = response.data
                alert(hasil.pesan)
                loadData()
            } catch (error) {
                alert(error)
            } finally {
                setisLoading(false)
            }
        }
    }

    return (
        <>
            {isLoading || dataMember == null ? (<>Loading</>) : (<><table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Nama</th>
                        <th>Telp</th>
                        <th>Email</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataMember.map((item, index) => {
                            return (<tr key={index}>
                                <td>{index + 1}.</td>
                                <td>{item.nama}</td>
                                <td>{item.telp}</td>
                                <td>{item.email}</td>
                                <td>
                                    <a href="#" className='btn btn-danger' onClick={() => { hapusData(item.id, item.nama) }}>Hapus</a> &nbsp;
                                    <Link to={`/ubah/${item.id}`} className='btn btn-info'>Ubah</Link>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </table></>)}
        </>
    );
}

export default Beranda;
