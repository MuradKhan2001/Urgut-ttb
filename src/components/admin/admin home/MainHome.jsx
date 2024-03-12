import "./adminHome.scss"
import Iframe from "react-iframe";
import React, {useContext, useEffect, useState} from "react";
import {MyContext} from "../../app/App";
import axios from "axios";


const MainHome = () => {
    let value = useContext(MyContext);
    const [MainList, setMainList] = useState({
        doctors: "",
        services: "",
        patients: ""
    });

    useEffect(() => {
        axios.get(`${value.url}home/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`,
            }
        }).then((response) => {
            let newList = {
                doctors: response.data[0].doctors,
                services: response.data[0].services,
                patients: response.data[0].patients
            };
            setMainList(newList)
        }).catch((error) => {
            if (error.response.statusText == "Unauthorized") {
                window.location.pathname = "/";
                localStorage.removeItem("token");
            }
        });
    }, []);

    return <div className="admin-home-container">
        <div className="statistic">
            <div className="statistic-box">
                <div className="title">Shifokorlar soni:</div>
                <div className="count">{MainList.doctors}</div>
            </div>

            <div className="statistic-box">
                <div className="title">Bo'limlar soni:</div>
                <div className="count">
                    {MainList.services}
                </div>
            </div>

            <div className="statistic-box">
                <div className="title">Bemorlar soni:</div>
                <div className="count">
                    {MainList.patients}
                </div>
            </div>
        </div>

        <div className="map-box">
            <Iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12237.100307163048!2d65.88771989359913!3d39.93523628690692!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4dff50332215a9%3A0x7e90a5326dfec4b0!2zItCY0LbRgtC40LzQvtC40LkiINCU0L7RgNC4LdC00LDRgNC80L7QvSDQtNC-0YDQuNGF0L7QvdCw!5e0!3m2!1sru!2sus!4v1684925337049!5m2!1sru!2sus"
                width={'100%'} height={'100%'} style="border:0;" allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"></Iframe>
        </div>
    </div>
};


export default MainHome