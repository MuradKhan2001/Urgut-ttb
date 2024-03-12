import "./style.scss";
import React, {useContext, useState, useEffect} from "react";
import {MyContext} from "../../../app/App";
import axios from "axios";

const Statistic = () => {
    let value = useContext(MyContext);
    const [MainList, setMainList] = useState([{
        doctors: "",
        services: "",
        patients: ""
    }]);
    const [doctors, setDoctor] = useState("");
    const [services, setServices] = useState("");
    const [patients, setPatients] = useState("");
    const [id, setId]= useState("");

    const getList = () => {
        axios.get(`${value.url}home/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`,
            }
        }).then((response) => {
            setId(response.data[0].id);
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
    };

    useEffect(() => {
        getList();
    }, []);

    const pushInfo = () => {
        if (doctors.trim().length > 0 && patients.trim().length && services.trim().length) {

            let Post = {
                doctors: doctors,
                services: services,
                patients: patients
            };

            axios.patch(`${value.url}home/${id}/`, Post, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                getList();
                document.getElementById('doctors').value = "";
                document.getElementById('services').value = "";
                document.getElementById('patients').value = "";

            }).catch(() => {

            });

        } else alert("Formani to'ldiring")

    };

    return <div className="statistic-box">
        <div className="content-card">
            <div className="left">
                <div className="inputs">
                    <input onChange={(e)=>setDoctor(e.target.value)} type="doctors" id="doctors" placeholder="Xodimlar soni"/>
                    <input onChange={(e)=>setServices(e.target.value)} type="services" id="services" placeholder="Bo'limlar soni"/>
                    <input onChange={(e)=>setPatients(e.target.value)} type="patients" id="patients" placeholder="Bemorlar soni"/>

                    <div onClick={pushInfo} className="add-button">Yangilash</div>
                </div>
            </div>

            <div className="right">
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
            </div>

        </div>
    </div>
};

export default Statistic