import React, {useContext, useEffect, useState} from 'react';
import ReactPaginate from "react-paginate";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/footer";
import axios from "axios";
import Aos from "aos";
import {MyContext} from "../app/App";
import Slider from "react-slick/lib";

function News() {
    let value = useContext(MyContext);
    const {t} = useTranslation();
    const [pageNumber, setPageNumber] = useState(0);
    const [news, setNews] = useState([]);
    const worksPage = 9;
    const pagesVisited = pageNumber * worksPage;
    const navigate = useNavigate();
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

    useEffect(() => {
        axios.get(`${value.url}news/`, {
            headers: {
                "Accept-Language": localStorage.getItem('language') ? localStorage.getItem('language') : "uz"
            }
        }).then((response) => {
            setNews(response.data.reverse());
        }).catch(() => {
        });

        Aos.init({duration: 1000});
    }, []);

    const displayWorks = news.slice(pagesVisited, pagesVisited + worksPage).map((item, index) => {
        return <div key={index} className="Events-photo">
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
                                    }} className="more-btn">
                                        {t('more')} <img src="./images/more2.png" alt=""/>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    });
    const pageCount = Math.ceil(news.length / worksPage);
    const changePage = ({selected}) => {
        setPageNumber(selected)
    };

    return (
        <>
            <div className="main-box-events">
                <Navbar/>
                <div className="organization-title">
                    {t('news')}
                </div>
                <div className="boxes-organization">
                    <div className="box-for-org">
                        <div className="row">
                            {displayWorks}
                        </div>
                    </div>
                    <ReactPaginate
                        previousLabel={<img src="./images/work-pagination-prev.png" alt=""/>}
                        nextLabel={<img src="./images/work-pagination-next.png" alt=""/>}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledCalassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />
                </div>
                <Footer/>
            </div>
        </>
    );
}

export default News;