import React, {useContext, useEffect, useState} from 'react';
import Iframe from "react-iframe";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {MyContext} from "../app/App";
import axios from "axios";
import Aos from "aos";

function Footer(props) {
    let value = useContext(MyContext);
    const [MainList, setMainList] = useState([]);
    const navigate = useNavigate();
    const {t} = useTranslation();

    useEffect(() => {
        axios.get(`${value.url}contact/`, {
            headers: {
                "Accept-Language": localStorage.getItem('language') ? localStorage.getItem('language') : "uz"
            }
        }).then((response) => {
            setMainList(response.data);
        }).catch(() => {
        });

        Aos.init({duration: 1000});
    }, []);

    return (
        <div className="home">
            <div className="footer" id='contact'>
                <div className="top-site">
                    {
                        MainList.map((item, index) => {
                            return <div key={index} className="footer-box-one">
                                <div className="footer-logo">
                                    <img src="./images/logo3.png" alt=""/>
                                </div>
                                <div className="location-text">
                                    <div className="top">
                                        <div className="icon-box">
                                            <img src="./images/Vector.png" alt=""/>
                                        </div>
                                        <div className="text-box">
                                            {t('address')}
                                        </div>
                                    </div>
                                    <div className="bottom">
                                        {item.address}
                                    </div>
                                </div>
                                <div className="location-text">
                                    <div className="top">
                                        <div className="icon-box">
                                            <img src="./images/Vector (2).png" alt=""/>
                                        </div>
                                        <div className="text-box">
                                            {t('phone')}
                                        </div>
                                    </div>
                                    <div className="bottom">
                                        <a href={`tel:${item.phone1}`}>
                                            {item.phone1} 
                                        </a>
                                        <a  href={`tel:${item.phone2}`}>
                                            {item.phone2} 
                                        </a>
                                    </div>
                                </div>
                            </div>
                        })
                    }

                    <div className="footer-box-two">
                        <div className="menu-text">
                            Menu
                        </div>
                        <div className="menues">
                            <p onClick={()=> navigate("/")} >{t('home')}</p>
                            <p onClick={()=> navigate("/leaders")} >{t('organizations')}</p>
                            <p onClick={()=> navigate("/departments")} >{t('teachers')}</p>
                            <p onClick={()=> navigate("/news")} >{t('news')}</p>
                            <p onClick={()=> navigate("/vacancy")} >{t('Vacancy')}</p>
                            <p onClick={()=> navigate("/qvp")} >{t('qvp')}</p>
                            <p onClick={()=> navigate("/contact")} >{t('contact')}</p>
                        </div>
                    </div>

                    {
                        MainList.map((item, index) => {
                            return <div key={index} className="footer-box-three">
                                <div className="map-box">

                                    <Iframe
                                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12237.100307163048!2d65.88771989359913!3d39.93523628690692!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4dff50332215a9%3A0x7e90a5326dfec4b0!2zItCY0LbRgtC40LzQvtC40LkiINCU0L7RgNC4LdC00LDRgNC80L7QvSDQtNC-0YDQuNGF0L7QvdCw!5e0!3m2!1sru!2sus!4v1684925337049!5m2!1sru!2sus"
                                        width={'100%'} height={'100%'} style="border:0;" allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"></Iframe>

                                </div>
                                <div className="web-site">
                                    <a href="http://narpay-ttb.uz/" target='_blank'>
                                        <img src="./images/Vector (3).png" alt=""/>urgut-ttb.uz
                                    </a>
                                </div>
                                <div className="social-media">
                                    <div className="media-text">
                                        {t('follow')}
                                    </div>
                                    <div className="media-icon">
                                        <a href={item.telegram} target="_blank"> <img src="./images/Vector (4).png"
                                                                                      alt=""/> </a>
                                        <a href={item.facebook} target="_blank"> <img src="./images/Vector (5).png"
                                                                                      alt=""/> </a>
                                        <a href={item.instagram} target="_blank"> <img src="./images/insta.png" alt=""/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        })
                    }

                </div>

                <div className="bottom-line">

                </div>
            </div>
        </div>
    );
}

export default Footer;