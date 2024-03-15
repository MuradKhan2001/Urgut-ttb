import React, {useState, useEffect, useContext} from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Aos from "aos";
import "aos/dist/aos.css";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/footer";
import axios from "axios";
import {MyContext} from "../app/App";
import i18next from "i18next";


function Home() {
    let value = useContext(MyContext);
    const {t} = useTranslation();
    const [aboutUs, setAboutus] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [service, setService] = useState([]);
    const [news, setNews] = useState([]);
    const [gallery, setGallery] = useState([]);
    const [contact, setContact] = useState([]);
    const [statistics, setStatistics] = useState([
        {
            doctors: "",
            services: "",
            patients: ""
        }
    ]);
    const navigate = useNavigate();

    const settingsForNews = {
        dots: false,
        infinite: true,
        speed: 1000,
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
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

    const settingsForImage = {
        dots: true,
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
                    infinite: true,
                    dots: true
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

    useEffect(() => {
        Aos.init({duration: 1500});

        axios.get(`${value.url}about/`, {
            headers: {
                "Accept-Language": localStorage.getItem('language') ? localStorage.getItem('language') : "uz"
            }
        }).then((response) => {
            setAboutus(response.data);
        });

        axios.get(`${value.url}doctor/`, {
            headers: {
                "Accept-Language": localStorage.getItem('language') ? localStorage.getItem('language') : "uz"
            }
        }).then((response) => {
            setDoctors(response.data);
        });

        axios.get(`${value.url}service/`, {
            headers: {
                "Accept-Language": localStorage.getItem('language') ? localStorage.getItem('language') : "uz"
            }
        }).then((response) => {
            setService(response.data);
        });

        axios.get(`${value.url}home/`, {
            headers: {
                "Accept-Language": localStorage.getItem('language') ? localStorage.getItem('language') : "uz"
            }
        }).then((response) => {
            let newList = {
                doctors: response.data[0] ? response.data[0].doctors : 0,
                services: response.data[0] ? response.data[0].services : 0,
                patients: response.data[0] ? response.data[0].patients : 0
            };
            setStatistics(newList)
        })

        axios.get(`${value.url}news/`, {
            headers: {
                "Accept-Language": localStorage.getItem('language') ? localStorage.getItem('language') : "uz"
            }
        }).then((response) => {
            setNews(response.data.reverse());
        })

        axios.get(`${value.url}contact/`, {
            headers: {
                "Accept-Language": localStorage.getItem('language') ? localStorage.getItem('language') : "uz"
            }
        }).then((response) => {
            setContact(response.data);
        });

        axios.get(`${value.url}galary/`).then((response) => {
            setGallery(response.data);
        })

    }, []);

    return (
        <>
            <div className="home">
                <Navbar/>

                <div className="home-box">
                    <div className="left-site">
                        <div className="title-home" style={i18next.language === "ru" ? {fontSize: 52} : {fontSize: 67}}>
                            <span
                                style={i18next.language === "ru" ? {fontSize: 20} : {fontSize: 36}}>{t('textTop')}</span>
                            <br/>
                            {t('textBottom')}
                        </div>
                        <div style={i18next.language === "ru" ? {fontSize: 20} : {fontSize: 24}}
                             className="description-home">
                            {t('textDes')}
                        </div>
                        <div className="line-home"></div>
                    </div>
                    <div className="right-site">
                      <div className="sloy">

                            <Slider {...settingsForImage} >

                            {gallery.map((item, index) => {
                                return <div key={index} data-aos="flip-right" className="click-slide-box">
                                    <img src={item.image} alt=""/>
                                </div>
                            })}

                             </Slider>

                        </div>  
                    </div>
                </div>

                <div className="about-us-box">
                    {
                        aboutUs.map((item, index) => {
                            return <div key={index} className="mirror-sloy">
                                <div className="sides">
                                    <div className="border-box"></div>
                                    <div className="border-box2"></div>
                                    <div className="image-box">
                                        <img src={item.image} alt=""/>
                                    </div>
                                </div>
                                <div className="sides">
                                    <div className="leaders-title">
                                        <div className="title-leader">
                                            {t('aboutus')}
                                        </div>
                                        <div className="line-text"></div>
                                    </div>
                                    <div className="main-text">
                                        {item.description}
                                    </div>
                                    {
                                        contact.map((item, index) => {
                                            return <div key={index} className="social-media">
                                                <a href={item.telegram} target="_blank">
                                                    <img src="./images/telegram2.png" alt=""/>
                                                </a>

                                                <a href={item.facebook} target="_blank">
                                                    <img src="./images/facebook.png" alt=""/>
                                                </a>
                                                <a href={item.instagram} target="_blank">
                                                    <img src="./images/instagram.png" alt=""/>
                                                </a>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        })
                    }
                </div>

                <div className="leaders">
                    <div className="leaders-title">
                        <div className="title-leader">
                            {t('leaders')}
                        </div>
                        <div className="line-text"></div>
                    </div>

                    <div className="leaders-container">

                        <Slider {...settingsForNews} >
                            {
                                doctors.length > 0 && doctors.filter((item) => item.user_type == "Head").map((item, index) => {
                                    return <div key={index} data-aos="flip-right" className="click-slide-box">
                                        <div className="leader-box">
                                            <img src={item.image} alt=""/>
                                            <div className="name-org">
                                                <div className="name">
                                                    {item.name}
                                                    {/*{item.name.split(" ").slice(0,1)}  &ensp;*/}
                                                    {/*{item.name.split(" ").slice(1,2)}  &ensp;*/}
                                                    {/*{item.name.split(" ")[item.name.split(" ").length-1].slice(0,1)}*/}
                                                </div>
                                                <div className="position">
                                                    {item.position}
                                                </div>
                                            </div>
                                            <div className="about-doctor">
                                                <div onClick={() => {
                                                    navigate("/employee");
                                                    sessionStorage.setItem("doctor", item.id)
                                                }} className="nore-btn">
                                                    {t('more')}
                                                    <img src="./images/more2.png" alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }

                        </Slider>
                    </div>
                </div>

                <div className="teachers">
                    <div className="teachers-title">
                        <div className="title-teacher">
                            {t('teachers')}
                        </div>
                        <div className="line-text"></div>
                    </div>
                    <div className="teachers-container">
                        <div className="teachers-box">
                            {
                                service.filter((item, index) => index < 4).map((item, index) => {
                                    return <div key={index} data-aos="zoom-in" className="teachers-photo">
                                        <div className="img-box">
                                            <img src={item.image} alt=""/>
                                        </div>
                                        <div className="name-teacher">
                                            <div className="name">
                                                {item.name}
                                            </div>
                                            <div onClick={() => {
                                                navigate("/about-service");
                                                sessionStorage.setItem("service", item.id)
                                            }} className="position">
                                                {t('more')} <img src="./images/more2.png" alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }


                        </div>
                    </div>
                    <div className="more-btns">
                        <button onClick={() => navigate("/departments")} className="button-82-pushable" role="button">
                            <span className="button-82-shadow"></span>
                            <span className="button-82-edge"></span>
                            <span className="button-82-front text">{t('more2')}</span>
                        </button>
                    </div>
                </div>

                <div className="Events">
                    <div className="Events-title">
                        <div className="title-Events">
                            {t('news')}
                        </div>
                        <div className="line-text"></div>
                    </div>
                    <div className="Events-container">
                        <div className="Events-box">
                            {
                              news.reverse().filter((item, index) => index < 3).map((item, index) => {
                                    return <div key={index} data-aos="zoom-in-up" className="Events-photo">
                                        <div className="news-box">
                                            <div className="img-box">

                                                {
                                                    item.image_set ?
                                                        <Slider {...settingsForNews2} >
                                                            {
                                                                item.image_set.map((item, index) => {
                                                                    return <div key={index}
                                                                                className="click-slide-box">
                                                                        <img key={index} src={item.image} alt=""/>
                                                                    </div>
                                                                })
                                                            }
                                                        </Slider> : ""
                                                }


                                                {
                                                    item.video ? <video src={item.video} controls></video> : ""
                                                }

                                                <div className="name-box">
                                                    <div className="name-Events">
                                                        <div className="content1">
                                                            <div className="events-name">
                                                                {item.title}
                                                            </div>
                                                            <div className="description">
                                                                {item.description}
                                                            </div>
                                                            <div className="events-date">
                                                                {item.date}
                                                            </div>
                                                            <div className="content2">
                                                                <div onClick={() => {
                                                                    navigate("/about-news");
                                                                    sessionStorage.setItem("news", item.id)
                                                                }}
                                                                     className="more-btn">
                                                                    {t('more')} <img src="./images/more2.png" alt=""/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                })
                            }

                        </div>
                    </div>
                </div>

                <div className="statistics-box">
                    <div data-aos="flip-left"
                         data-aos-easing="ease-out-cubic"
                         data-aos-duration="900" className="statistic-card">
                        <div className="img-box">
                            <img src="./images/rating.png" alt=""/>
                        </div>
                        <div className="count-box">{statistics.patients}</div>
                        <div className="name-box">{t('statistic1')}</div>
                    </div>

                    <div data-aos="flip-left"
                         data-aos-easing="ease-out-cubic"
                         data-aos-duration="1300" className="statistic-card">
                        <div className="img-box">
                            <img src="./images/health.png" alt=""/>
                        </div>
                        <div className="count-box">{statistics.services}</div>
                        <div className="name-box">{t('statistic2')}</div>
                    </div>

                    <div data-aos="flip-left"
                         data-aos-easing="ease-out-cubic"
                         data-aos-duration="1700" className="statistic-card">
                        <div className="img-box">
                            <img src="./images/medical-team.png" alt=""/>
                        </div>
                        <div className="count-box">{statistics.doctors}</div>
                        <div className="name-box">{t('statistic3')}</div>
                    </div>

                </div>

                <Footer/>
            </div>
        </>
    );
}

export default Home;