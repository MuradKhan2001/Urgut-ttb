import React, {useContext, useEffect, useState} from 'react';
import Navbar from "../navbar/Navbar";
import Footer from "../footer/footer";
import {MyContext} from "../app/App";
import axios from "axios";
import Aos from "aos";
import {useTranslation} from "react-i18next";

function AboutEmployee() {

    let value = useContext(MyContext);
    const {t} = useTranslation();
    const [doctors, setDoctors] = useState({});

    useEffect(() => {
        axios.get(`${value.url}doctor/${sessionStorage.getItem("doctor")}/`, {
            headers: {
                "Accept-Language": localStorage.getItem('language') ? localStorage.getItem('language') : "uz"
            }
        }).then((response) => {
            setDoctors(response.data);
        }).catch(() => {
        });

        Aos.init({duration: 1000});
    }, []);

    return (
        <>
            <div className="employee-container">
                <Navbar/>
                {
                    doctors ? <div className="employee-box">
                        <div className="employee-photo">
                            <img src={doctors.image} alt=""/>
                        </div>
                        <div className="employee-text">
                            <div className="employee-content">
                                <div className="name-employee">
                                    {doctors.name}
                                </div>
                                <div className="line-for-name"></div>
                                <div className="main-text">
                                    <div className="title-text">{t('position')}</div>
                                    <div className="title-main-text">
                                        {doctors.position}
                                    </div>
                                    <div className="title-text">{t('bio')}</div>
                                    <div className="title-main-text">
                                        {doctors.bio}
                                    </div>
                                    <div className="title-text ">{t('date')}</div>
                                    <div className="title-main-text ">
                                        {doctors.admission}
                                    </div>

                                </div>
                            </div>
                            <div className="employee-line"></div>
                        </div>
                    </div> :""
                }
                <Footer/>
            </div>
        </>
    );
}

export default AboutEmployee;