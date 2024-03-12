import "./style.scss"
import React, {useContext, useEffect, useState} from "react";
import {MyContext} from "../../../app/App";
import axios from "axios";
import Slider from "react-slick/lib";

const NewsA = () => {
    let value = useContext(MyContext);
    const [MainList, setMainList] = useState([]);
    const [desUz, setDesUz] = useState("");
    const [desRu, setDesRu] = useState("");
    const [TitleUz, setTitleUz] = useState("");
    const [TitleRu, setTitleRu] = useState("");
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);

    const getList = (lng) => {
        axios.get(`${value.url}news/`, {
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
        if (desUz.trim().length > 0 && desRu.trim().length > 0 && TitleUz.trim().length > 0
            && TitleRu.trim().length > 0) {

            let Post = new FormData();

            const translations = {
                ru: {
                    description: desRu,
                    title: TitleRu
                },
                uz: {
                    description: desUz,
                    title: TitleUz
                },
            };

            Post.append("translations", JSON.stringify(translations));


            if (image) {
                for (let i = 0; i < image.length; i++) {
                    Post.append("images", image[i]);
                }
            }

            if (video) Post.append("video", video);


            axios.post(`${value.url}news/`, Post, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            }).then(() => {

                getList();

                document.getElementById('desUz').value = "";
                document.getElementById('desRu').value = "";
                document.getElementById('TitleUz').value = "";
                document.getElementById('TitleRu').value = "";
                document.getElementById('photo').value = "";
                document.getElementById('video').value = "";

            }).catch(() => {

            });

        } else alert("Formani to'ldiring")

    };

    const delInfo = (id) => {
        axios.delete(`${value.url}news/${id}/`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then(() => {
            getList();
        }).catch(() => {
        });
    };

    const settingsForNews = {
        dots: false,
        infinite: true,
        speed: 1000,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return <div className="news-admin-box">
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
                    <input id="TitleUz" onChange={(e) => setTitleUz(e.target.value)} placeholder="Sarlavha"
                           type="text"/>
                    <textarea id="desUz" onChange={(e) => setDesUz(e.target.value)}
                              placeholder="Ma'lumot uchun"></textarea>

                    <label>RU:</label>
                    <input id="TitleRu" onChange={(e) => setTitleRu(e.target.value)} placeholder="Заголовок"
                           type="text"/>
                    <textarea id="desRu" onChange={(e) => setDesRu(e.target.value)}
                              placeholder="Для информации"></textarea>

                    <label htmlFor="photo">Rasm:</label>
                    <input onChange={(e) => {
                        console.log(e.target.files)
                        setImage(e.target.files)
                    }} id="photo" type="file" multiple/>

                    <label htmlFor="video">Video:</label>
                    <input onChange={(e) => setVideo(e.target.files[0])} id="video" type="file"/>

                    <div onClick={pushInfo} className="add-button">Qo'shish</div>
                </div>
            </div>

            <div className="right">

                {
                    MainList.map((item, index) => {
                        return <div key={index} className="cards">
                            <div className="for-img">

                                {
                                    item.image_set ?
                                        <Slider {...settingsForNews} >
                                            {
                                                item.image_set.map((item, index) => {
                                                    return <div key={index}
                                                                className="click-slide-box">
                                                        <img key={index} src={item.image} alt=""/>
                                                        <div className="leader-box">

                                                        </div>


                                                    </div>
                                                })
                                            }
                                        </Slider> : ""
                                }


                                {
                                    item.video ? <video src={item.video} controls></video> : ""
                                }
                            </div>

                            <div className="for-text">
                                <div className="title">{item.title}</div>
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

export default NewsA