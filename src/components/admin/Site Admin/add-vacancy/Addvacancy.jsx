import "./style.scss";
import {useContext, useState, useEffect} from "react";
import {MyContext} from "../../../app/App";
import axios from "axios";

const AddVacancy = () => {
    let value = useContext(MyContext);
    const [MainList, setMainList] = useState([]);

    const [postionUz, setPostionUz] = useState("");
    const [specializationUz, setSpecializationUz] = useState("");
    const [education_degreeUz, setEducation_degreeUz] = useState("");
    const [required_experienceUz, setRequired_experienceUz] = useState("");
    const [salaryUz, setSalaryUz] = useState("");
    const [contactUz, setContactUz] = useState("");

    const [postionRu, setPostionRu] = useState("");
    const [specializationRu, setSpecializationRu] = useState("");
    const [education_degreeRu, setEducation_degreeRu] = useState("");
    const [required_experienceRu, setRequired_experienceRu] = useState("");
    const [salaryRu, setSalaryRu] = useState("");
    const [contactRu, setContactRu] = useState("");

    const [lngKey, setLngKey] = useState("uz");


    const getList = (lng) => {
        axios.get(`${value.url}vacancy/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`,
                "Accept-Language": lng ? lng : "uz"
            }
        }).then((response) => {
            setMainList(response.data);
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
        if (postionUz.trim().length > 0 && specializationUz.trim().length > 0 && education_degreeUz.trim().length > 0 && required_experienceUz.trim().length > 0
            && salaryUz.trim().length > 0 && contactUz.trim().length > 0 &&
            postionRu.trim().length > 0 && specializationRu.trim().length > 0 && education_degreeRu.trim().length > 0 && required_experienceRu.trim().length > 0
            && salaryRu.trim().length > 0 && contactRu.trim().length > 0) {


            const translations = {
                ru: {
                    postion: postionRu,
                    specialization: specializationRu,
                    education_degree: education_degreeRu,
                    required_experience: required_experienceRu,
                    salary: salaryRu,
                    contact: contactRu
                },
                uz: {
                    postion: postionUz,
                    specialization: specializationUz,
                    education_degree: education_degreeUz,
                    required_experience: required_experienceUz,
                    salary: salaryUz,
                    contact: contactUz
                },
            };

            let Post = {
                "translations": translations
            }

            axios.post(`${value.url}vacancy/`, Post, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then((response) => {

                getList();

                setPostionUz("");
                setSpecializationUz("");
                setEducation_degreeUz("");
                setRequired_experienceUz("");
                setSalaryUz("");
                setContactUz("");
                setPostionRu("");
                setSpecializationRu("");
                setEducation_degreeRu("");
                setRequired_experienceRu("");
                setSalaryRu("");
                setContactRu("");

                document.getElementById('postionUz').value = "";
                document.getElementById('specializationUz').value = "";
                document.getElementById('education_degreeUz').value = "";
                document.getElementById('required_experienceUz').value = "";
                document.getElementById('salaryUz').value = "";
                document.getElementById('contactUz').value = "";
                document.getElementById('postionRu').value = "";
                document.getElementById('specializationRu').value = "";
                document.getElementById('education_degreeRu').value = "";
                document.getElementById('required_experienceRu').value = "";
                document.getElementById('salaryRu').value = "";
                document.getElementById('contactRu').value = "";


            }).catch(() => {

            });

        } else alert("Formani to'ldiring")
    };

    const delInfo = (id) => {
        axios.delete(`${value.url}vacancy/${id}/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then(() => {
            getList();
        }).catch(() => {
        });
    };

    return <div className="vacancy-box">

        <div className="header-side">
            <div className="filter-box">
                <div className="inputs">
                    <select name="partner" id="partner" onChange={(e) => {
                        getList(e.target.value);
                        setLngKey(e.target.value)
                    }}>
                        <option value={"uz"}>UZ</option>
                        <option value={"ru"}>RU</option>
                    </select>
                </div>
            </div>
        </div>

        <div className="content-card">
            <div className="left">
                <div className="inputs">
                    <label>UZ:</label>
                    <input id="postionUz" onChange={(e) => setPostionUz(e.target.value)} placeholder="Ish o'rni nomi"
                           type="text"/>
                    <input id="specializationUz" onChange={(e) => setSpecializationUz(e.target.value)}
                           placeholder="Mutaxasislik"
                           type="text"/>
                    <input id="education_degreeUz" onChange={(e) => setEducation_degreeUz(e.target.value)}
                           placeholder="Ma'lumoti"
                           type="text"/>
                    <input id="required_experienceUz" onChange={(e) => setRequired_experienceUz(e.target.value)}
                           placeholder="Ish tajribasi"
                           type="text"/>
                    <input id="salaryUz" onChange={(e) => setSalaryUz(e.target.value)} placeholder="Maoshi"
                           type="text"/>
                    <input id="contactUz" onChange={(e) => setContactUz(e.target.value)} placeholder="Tel nomer"
                           type="text"/>

                    <label>RU:</label>
                    <input id="postionRu" onChange={(e) => setPostionRu(e.target.value)} placeholder="Должность"
                           type="text"/>
                    <input id="specializationRu" onChange={(e) => setSpecializationRu(e.target.value)}
                           placeholder="Экспертиза"
                           type="text"/>
                    <input id="education_degreeRu" onChange={(e) => setEducation_degreeRu(e.target.value)}
                           placeholder="Информация"
                           type="text"/>
                    <input id="required_experienceRu" onChange={(e) => setRequired_experienceRu(e.target.value)}
                           placeholder="Опыт работы"
                           type="text"/>
                    <input id="salaryRu" onChange={(e) => setSalaryRu(e.target.value)} placeholder="Зарплата"
                           type="text"/>
                    <input id="contactRu" onChange={(e) => setContactRu(e.target.value)} placeholder="Номер телефона"
                           type="text"/>

                    <div onClick={pushInfo} className="add-button">Qo'shish</div>
                </div>
            </div>

            <div className="right">
                {
                    MainList.map((item, index) => {
                        return <div key={index} className="cards">
                            <div className="for-text">
                                {
                                    lngKey === "uz" ?
                                        <div>
                                            <div className="title">Ish o'rni nomi: <span>{item.postion}</span></div>

                                            <div className="title">Mutaxasislik: <span>{item.specialization}</span>
                                            </div>

                                            <div className="title">Ma'lumoti: <span>{item.education_degree}</span></div>
                                            <div className="title">Ish
                                                tajribasi: <span>{item.required_experience}</span></div>

                                            <div className="title">Maoshi: <span>{item.salary}</span></div>

                                            <div className="title">Tel nomer: <span>{item.contact}</span></div>

                                        </div> : ""
                                }

                                {
                                    lngKey === "ru" ?
                                        <div>
                                            <div className="title">Должность: <span>{item.postion}</span></div>
                                            <div
                                                className="title">Экспертиза: <span>{item.specialization}</span></div>
                                            <div
                                                className="title">Информация: <span>{item.education_degree}</span></div>
                                            <div className="title">Опыт
                                                работы: <span>{item.required_experience}</span></div>
                                            <div className="title">Зарплата: <span>{item.salary}</span></div>
                                            <div className="title">Номер телефона: <span>{item.contact}</span></div>
                                        </div> : ""
                                }
                            </div>
                            <div className="for-btns">
                                <div>
                                    <img onClick={() => delInfo(item.id)} src="../images/delete.png"
                                         alt=""/>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>

    </div>
};

export default AddVacancy