'use client'
import React, { useState } from 'react'
import styles from '../page.module.css'
import { toast } from 'react-toastify';

//https://fkhadra.github.io/react-toastify/render-what-you-want

const Tripage = () => {

    const onClick = () => toast.info('Hello this is message !', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const alertCobined = () => {
        toast("Hello there", {
          onOpen: () => window.alert('Called when I open'),
          onClose: () => window.alert('Called when I close')
        });
      }
    const notify = () => toast.success('Your job is completed!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    return (
        <>
            <div className='mt-3'>
                <button type="button" onClick={onClick} className="btn btn-primary">Show live toast</button>
                <button className="btn btn-success ms-4" onClick={notify}>Notify!</button>
                <button className="btn btn-success ms-4" onClick={alertCobined}>alert combined!</button>
            </div>

        </>
    )
}

export default Tripage