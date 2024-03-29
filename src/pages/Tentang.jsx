import React, { useEffect, useState } from 'react';
import { judul } from '../config/fungsi';

const Tentang = () => {
    const [counter, setcounter] = useState(0);

    const hitung = (mode) => {

        switch (mode) {
            case "+":
                setcounter(counter + 1)
                break;
            case "-":
                setcounter(counter - 1)
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        document.title = `Beranda ${judul}`
    }, []);

    return (
        <div>
            Angka: {counter} <br />
            <button className='btn btn-primary' onClick={() => { hitung("+") }}>Tambah</button>
            <button className='btn btn-danger' onClick={() => { hitung("-") }}>Kurang</button>
        </div>
    );
}

export default Tentang;
