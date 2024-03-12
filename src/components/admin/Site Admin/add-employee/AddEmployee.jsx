import "./style.scss";
import {useContext, useState, useEffect} from "react";
import {MyContext} from "../../../app/App";
import axios from "axios";

const AddEmployee = () => {

    let value = useContext(MyContext);
    const [MainList, setMainList] = useState([]);

    const [positionUz, setPositionUz] = useState("");
    const [nameUz, setNameUz] = useState("");
    const [bioUz, setBioUz] = useState("");
    const [admissionUz, setAdmissionUz] = useState("");

    const [positionRu, setPositionRu] = useState("");
    const [nameRu, setNameRu] = useState("");
    const [bioRu, setBioRu] = useState("");
    const [admissionRu, setAdmissionRu] = useState("");

    const [user_type, setUser_type] = useState("");

    const getImage = (e) => {
        setImage(e.target.files[0])
    };

    const [image, setImage] = useState(null);

    const getList = (lng) => {
        axios.get(`${value.url}doctor/`, {
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
        if (positionUz.trim().length > 0 && nameUz.trim().length > 0 && bioUz.trim().length > 0 && admissionUz.trim().length > 0 &&
            positionRu.trim().length > 0 && nameRu.trim().length > 0 && bioRu.trim().length > 0 && admissionRu.trim().length > 0 &&
            image && user_type) {

            let Post = new FormData();

            const translations = {
                ru: {
                    position: positionRu,
                    name: nameRu,
                    bio: bioRu,
                    admission: admissionRu
                },
                uz: {
                    position: positionUz,
                    name: nameUz,
                    bio: bioUz,
                    admission: admissionUz
                },
            };

            Post.append("translations", JSON.stringify(translations));
            Post.append("user_type", user_type);
            Post.append("image", image);

            axios.post(`${value.url}doctor/`, Post, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then(() => {

                getList();


                setPositionUz("");
                setNameUz("");
                setBioUz("");
                setAdmissionUz("");
                setPositionRu("");
                setNameRu("");
                setBioRu("");
                setAdmissionRu("");
                setUser_type("");

                document.getElementById('positionUz').value = "";
                document.getElementById('nameUz').value = "";
                document.getElementById('bioUz').value = "";
                document.getElementById('admissionUz').value = "";

                document.getElementById('positionRu').value = "";
                document.getElementById('nameRu').value = "";
                document.getElementById('bioRu').value = "";
                document.getElementById('admissionRu').value = "";

                document.getElementById('image').value = "";
                document.getElementById('user_type').value = "";

            }).catch(() => {

            });

        } else alert("Formani to'ldiring")
    };

    const delInfo = (id) => {
        axios.delete(`${value.url}doctor/${id}/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then(() => {
            getList();
        }).catch(() => {
        });
    };


    return <div className="employee-box">
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

                    <select name="user_type" id="user_type" onChange={(e) => {
                        setUser_type(e.target.value)
                    }}>
                        <option></option>
                        <option value={"Head"}>Raxbar</option>
                        <option value={"Doctor"}>Shifokor</option>
                    </select>

                    <label>UZ:</label>
                    <input id="positionUz" onChange={(e) => setPositionUz(e.target.value)} placeholder="Lavozimi"
                           type="text"/>
                    <input id="nameUz" onChange={(e) => setNameUz(e.target.value)} placeholder="Shifokor ismi"
                           type="text"/>
                    <textarea id="bioUz" onChange={(e) => setBioUz(e.target.value)}
                              placeholder="Shifokor haqida ma'lumot"></textarea>
                    <input id="admissionUz" onChange={(e) => setAdmissionUz(e.target.value)} placeholder="Qabul kunlari"
                           type="text"/>


                    <label>RU:</label>
                    <input id="positionRu" onChange={(e) => setPositionRu(e.target.value)} placeholder="Позиция"
                           type="text"/>
                    <input id="nameRu" onChange={(e) => setNameRu(e.target.value)} placeholder="Имя доктора"
                           type="text"/>
                    <textarea id="bioRu" onChange={(e) => setBioRu(e.target.value)}
                              placeholder="Информация о враче"></textarea>
                    <input id="admissionRu" onChange={(e) => setAdmissionRu(e.target.value)} placeholder="Приемные дни"
                           type="text"/>

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
                                <div className="title">{item.position}</div>
                                <div className="title">{item.admission}</div>
                                <div className="des">
                                    {item.bio}
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, itaque?
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

export default AddEmployee