import React, {useContext, useEffect, useState} from 'react';
import Navbar from "../navbar/Navbar";
import Footer from "../footer/footer";
import axios from "axios";
import Aos from "aos";
import {MyContext} from "../app/App";
import Slider from "react-slick/lib";

function AboutNews() {
    let value = useContext(MyContext);
    const [news, setNews] = useState({});

    useEffect(() => {
        axios.get(`${value.url}news/${sessionStorage.getItem("news")}/`, {
            headers: {
                "Accept-Language": localStorage.getItem('language') ? localStorage.getItem('language') : "uz"
            }
        }).then((response) => {
            setNews(response.data);
        }).catch(() => {
        });

        Aos.init({duration: 1000});
    }, []);

    const settingsForNews2 = {
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
                    initialSlide: 1
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
    return (
        <>
            <div className="news-container">
                <Navbar/>
                {
                    news ?  <div className="employee-box">
                        <div className="employee-photo">
                            {
                                news.image_set ?
                                    <Slider {...settingsForNews2} >
                                        {
                                            news.image_set.map((item, index) => {
                                                return <div key={index}
                                                            className="click-slide-box">
                                                    <img key={index} src={item.image} alt=""/>
                                                </div>
                                            })
                                        }
                                    </Slider> : ""
                            }


                            {
                                news.video ? <video src={news.video} controls></video> : ""
                            }
                        </div>
                        <div className="employee-text">
                            <div className="employee-content">
                                <div className="name-employee">
                                    {news.title}
                                </div>
                                <div className="line-for-name"></div>
                                <div className="main-text">
                                    {news.description}
                                </div>
                                <div className="date-news">
                                    {news.date}
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

export default AboutNews;