import "./about-us.scss";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {MyContext} from "../../../app/App";


const Aboutus = () => {
    let value = useContext(MyContext);
    const [MainList, setMainList] = useState([]);

    const [desUz, setDesUz] = useState("");
    const [desRu, setDesRu] = useState("");
    const [image, setImage] = useState(null);

    const getImage = (e) => {
        setImage(e.target.files[0])
    };

    const getList = (lng) => {
        axios.get(`${value.url}about/`, {
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
        if (desUz.trim().length > 0  && desRu.trim().length > 0 && image) {

            let Post = new FormData();

            const translations = {
                ru: {
                    description: desRu
                },
                uz: {
                    description: desUz
                },
            };

            Post.append("translations", JSON.stringify(translations));
            Post.append("image", image);

            axios.post(`${value.url}about/`, Post, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then(() => {

                getList();
                document.getElementById('uz').value= "";
                document.getElementById('ru').value= "";
                document.getElementById('photo').value= "";

            }).catch((error) => {
                console.log(error)
            });

        } else alert("Formani to'ldiring")

    };

    return <div className="aboutus-container">
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
                    <textarea name="uz" id="uz" onChange={(e) => setDesUz(e.target.value)} placeholder="Ma'lumot uchun"></textarea>

                    <textarea name="ru" id="ru" onChange={(e) => setDesRu(e.target.value)} placeholder="Для информации"></textarea>

                    <label htmlFor="photo">Rasm:</label>
                    <input onChange={getImage} id="photo" type="file"/>

                    <div onClick={pushInfo} className="add-button">Qo'shish</div>
                </div>
            </div>

            <div className="right">
                {
                    MainList.map((item) => {
                        return <div key={item.id} className="cards">
                            <div className="for-img">
                                <img src={item.image} alt=""/>
                            </div>

                            <div className="for-text">
                                <div className="des">
                                    {item.description}
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>

        </div>

    </div>
};

export default Aboutus