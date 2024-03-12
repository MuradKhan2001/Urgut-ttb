import "./style.scss";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {MyContext} from "../../../app/App";

const Addqvp = () => {

    let value = useContext(MyContext);
    const [MainList, setMainList] = useState([]);

    const [addressUz, setAddressUz] = useState("");
    const [doctorUz, setDoctorUz] = useState("");

    const [addressRu, setAddressRu] = useState("");
    const [doctorRu, setDoctorRu] = useState("");

    const [contact, setContact] = useState("");


    const getList = (lng) => {
        axios.get(`${value.url}qvp/`, {
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
        getList()
    }, []);

    const AddCars = () => {

        if (addressUz.trim().length > 0 && doctorUz.trim().length > 0 && contact.trim().length > 0
            && addressRu.trim().length > 0 && doctorRu.trim().length > 0) {

            let Post = {
                contact,
                translations: {
                    ru: {
                        doctor: doctorRu,
                        address: addressRu
                    },
                    uz: {
                        doctor: doctorUz,
                        address: addressUz
                    },
                },
            };
            axios.post(`${value.url}qvp/`, Post, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then(() => {
                getList();
                setAddressUz("");
                setDoctorUz("");
                setAddressRu("");
                setDoctorRu("");
                setContact("");

                document.getElementById('addressUz').value = "";
                document.getElementById('addressRu').value = "";
                document.getElementById('doctorUz').value = "";
                document.getElementById('doctorRu').value = "";
                document.getElementById('contact').value = "";
            }).catch((error) => {
                if (error.response.statusText == "Unauthorized") {
                    window.location.pathname = "/";
                    localStorage.removeItem("token");
                }
            });
        } else alert("Formani toldiring")
    };

    const DelCar = (id) => {
        axios.delete(`${value.url}qvp/${id}/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then(() => {
            getList();
        }).catch(() => {
        });
    };

    return <div className="qvp-box">
        <div className="header-side">
            <div className="filter-box">

                <div className="inputs">

                    <select name="partner" id="partner" onChange={(e) => {
                        getList(e.target.value)
                    }}>
                        <option value={"uz"}>UZ</option>
                        <option value={"ru"}>RU</option>
                    </select>

                    <input id="addressUz" onChange={(e) => setAddressUz(e.target.value)} placeholder="Manzil nomi"
                           type="text"/>

                    <input id="addressRu" onChange={(e) => setAddressRu(e.target.value)} placeholder="Адрес"
                           type="text"/>

                    <input id="doctorUz" onChange={(e) => setDoctorUz(e.target.value)}
                           placeholder="Biriktirilgan shifokor" type="text"/>

                    <input id="doctorRu" onChange={(e) => setDoctorRu(e.target.value)}
                           placeholder="Прикрепленный врач" type="text"/>

                    <input id="contact" onChange={(e) => setContact(e.target.value)}
                           placeholder="Murojaat uchun tel" type="text"/>
                </div>
                <div onClick={AddCars} className="filter-btn">
                    <span>Qo'shish</span>
                </div>
            </div>
        </div>

        <div className="table-content">
            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Manzil</th>
                    <th>Biriktirilgan shifokor</th>
                    <th>Murojaat uchun tel</th>
                    <th>O'chirish</th>
                </tr>
                </thead>

                <tbody>
                {
                    MainList.map((item, index) => {
                        return <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.address}</td>
                            <td>{item.doctor}</td>
                            <td>{item.contact}</td>
                            <td>
                                <div>
                                    <img onClick={() => DelCar(item.id)} src="../images/delete.png" alt=""/>
                                </div>
                            </td>
                        </tr>
                    })
                }
                </tbody>
            </table>
        </div>
    </div>
};

export default Addqvp