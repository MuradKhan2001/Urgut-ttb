import React, {useContext, useEffect, useState} from 'react';
import Navbar from "../navbar/Navbar";
import Footer from "../footer/footer";
import axios from "axios";
import Aos from "aos";
import {MyContext} from "../app/App";
import {useTranslation} from "react-i18next";

function Qvp() {
    let value = useContext(MyContext);
    const {t} = useTranslation();
    const [qvp, setQvp] = useState([]);
    useEffect(() => {
        axios.get(`${value.url}qvp/`, {
            headers: {
                "Accept-Language": localStorage.getItem('language') ? localStorage.getItem('language') : "uz"
            }
        }).then((response) => {
            setQvp(response.data);
        }).catch(() => {
        });

        Aos.init({duration: 1000});
    }, []);

    return (
        <>
            <div className="qvp-container">
                <Navbar/>
                <div className="cards-content">
                    {qvp.map((item,index)=>{
                        return <div key={index} className='content' >
                        <div className='left'>
                            <img src={item.image} ></img>
                        </div>
                        <div className='right'>
                            <div className='title'>{t('nameQvp')}</div>
                            <div className='text'>{item.name}</div>

                            <div className='title'>{t('address')}</div>
                            <div className='text'>{item.address}</div>

                            <div className='title'>{t('doctor2')}</div>
                            <div className='text'>{item.doctor}</div>

                            <div className='title'>{t('phone')}</div>
                            <div className='text'>{item.contact}</div>
                        </div>
                    </div>
                    })}
                    
                </div>
                <Footer/>
            </div>
        </>
    );
}

export default Qvp;