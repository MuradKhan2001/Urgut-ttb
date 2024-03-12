import React, {useContext, useEffect, useState} from 'react';
import Navbar from "../navbar/Navbar";
import Footer from "../footer/footer";
import {MyContext} from "../app/App";
import axios from "axios";
import Aos from "aos";
import {useTranslation} from "react-i18next";

function AboutService() {
    let value = useContext(MyContext);
    const {t} = useTranslation();
    const [service, setService] = useState({});

    useEffect(() => {
        axios.get(`${value.url}service/${sessionStorage.getItem("service")}/`, {
            headers: {
                "Accept-Language": localStorage.getItem('language') ? localStorage.getItem('language') : "uz"
            }
        }).then((response) => {
            setService(response.data);
        }).catch(() => {
        });

        Aos.init({duration: 1000});
    }, []);

    return (
        <>
            <div className="service-container">
                <Navbar/>
                {
                    service ? <div className="employee-box">
                        <div className="employee-text">
                            <div className="employee-content">
                                <div className="name-employee">
                                    <img src={service.image} alt=""/> {service.name}
                                </div>
                                <div className="line-for-name"></div>
                                <div className="main-text">
                                    <div className="title-text">{t('about_service')}</div>
                                    <div className="title-main-text">
                                        {service.description}
                                    </div>
                                    <div className="title-text">{t('doctor')}</div>
                                    <div className="title-main-text">
                                        {service.doctor}
                                    </div>
                                    <div className="title-text ">{t('date')}</div>
                                    <div className="title-main-text ">
                                        {service.admission}
                                    </div>

                                </div>
                            </div>
                            <div className="employee-line"></div>
                        </div>
                    </div> : ""
                }
                <Footer/>
            </div>
        </>
    );
}

export default AboutService;