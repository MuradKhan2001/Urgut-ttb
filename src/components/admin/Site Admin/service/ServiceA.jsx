import "./style.scss"
import {useContext, useEffect, useState} from "react";
import {MyContext} from "../../../app/App";
import axios from "axios";

const ServiceA = () => {
    let value = useContext(MyContext);
    const [MainList, setMainList] = useState([]);

    const [nameUz, setNameUz] = useState("");
    const [doctorUz, setDoctorUz] = useState("");
    const [admissionUz, setAdmissionUz] = useState("");
    const [descriptionUz, setDescriptionUz] = useState("");

    const [nameRu, setNameRu] = useState("");
    const [doctorRu, setDoctorRu] = useState("");
    const [admissionRu, setAdmissionRu] = useState("");
    const [descriptionRu, setDescriptionRu] = useState("");


    const getImage = (e) => {
        setImage(e.target.files[0])
    };

    const [image, setImage] = useState(null);

    const getList = (lng) => {
        axios.get(`${value.url}service/`, {
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
        if (nameUz.trim().length > 0 && doctorUz.trim().length > 0 && admissionUz.trim().length > 0 && descriptionUz.trim().length > 0 &&
            nameRu.trim().length > 0 && doctorRu.trim().length > 0 && admissionRu.trim().length > 0 && descriptionRu.trim().length > 0 && image) {

            let Post = new FormData();

            const translations = {
                ru: {
                    name: nameRu,
                    doctor: doctorRu,
                    admission: admissionRu,
                    description: descriptionRu
                },
                uz: {
                    name: nameUz,
                    doctor: doctorUz,
                    admission: admissionUz,
                    description: descriptionUz
                },
            };

            Post.append("translations", JSON.stringify(translations));
            Post.append("image", image);

            axios.post(`${value.url}service/`, Post, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then(() => {

                getList();

                document.getElementById('nameUz').value = "";
                document.getElementById('doctorUz').value = "";
                document.getElementById('admissionUz').value = "";
                document.getElementById('descriptionUz').value = "";
                document.getElementById('nameRu').value = "";
                document.getElementById('doctorRu').value = "";
                document.getElementById('admissionRu').value = "";
                document.getElementById('descriptionRu').value = "";
                document.getElementById('image').value = "";

            }).catch(() => {

            });

        } else alert("Formani to'ldiring")
    };

    const delInfo = (id) => {
        axios.delete(`${value.url}service/${id}/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then(() => {
            getList();
        }).catch(() => {
        });
    };


    return <div className="service-admin-box">
        <div className="header-side">
            <div className="filter-box">
                <div className="inputs">
                    <select name="partner" id="partner" onChange={(e) => {
                        getList(e.target.value)
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
                    <input id="nameUz" onChange={(e) => setNameUz(e.target.value)} placeholder="Bo'lim nomi"
                           type="text"/>
                    <input id="doctorUz" onChange={(e) => setDoctorUz(e.target.value)} placeholder="Shifokor"
                           type="text"/>
                    <input id="admissionUz" onChange={(e) => setAdmissionUz(e.target.value)} placeholder="Qabul kunlari"
                           type="text"/>
                    <textarea id="descriptionUz" onChange={(e) => setDescriptionUz(e.target.value)}
                              placeholder="Bo'lim haqida"></textarea>


                    <label>RU:</label>
                    <input id="nameRu" onChange={(e) => setNameRu(e.target.value)} placeholder="Название раздела"
                           type="text"/>
                    <input id="doctorRu" onChange={(e) => setDoctorRu(e.target.value)} placeholder="Врач"
                           type="text"/>
                    <input id="admissionRu" onChange={(e) => setAdmissionRu(e.target.value)} placeholder="Приемные дни"
                           type="text"/>
                    <textarea id="descriptionRu" onChange={(e) => setDescriptionRu(e.target.value)}
                              placeholder="O раздела"></textarea>

                    <label htmlFor="image">Rasm:</label>
                    <input onChange={getImage} id="image" type="file"/>

                    <div onClick={pushInfo} className="add-button">Qo'shish</div>
                </div>
            </div>

            <div className="right">
                {
                    MainList.map((item, index) => {
                        return <div key={index} className="cards">
                            <div className="for-img">
                                <img src={item.image} alt=""/>
                            </div>
                            <div className="for-text">
                                <div className="title">{item.name}</div>
                                <div className="title">{item.doctor}</div>
                                <div className="title">{item.admission}</div>
                                <div className="des">
                                    {item.description}
                                </div>
                            </div>
                            <div className="for-btns">
                                <div>
                                    <img onClick={() => delInfo(item.id)} src="../images/delete.png" alt=""/>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>

        </div>
    </div>
};

export default ServiceA