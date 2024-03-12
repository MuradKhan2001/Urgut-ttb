import React, {useContext, useEffect, useState} from 'react';
import ReactPaginate from "react-paginate";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/footer";
import Aos from "aos";
import axios from "axios";
import {MyContext} from "../app/App";

function Vacancy() {
    const navigate = useNavigate();
    const {t} = useTranslation();
    let value = useContext(MyContext);
    const [vacancy, setVacancy] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const worksPage = 4;
    const pagesVisited = pageNumber * worksPage;

    useEffect(() => {
        axios.get(`${value.url}vacancy/`, {
            headers: {
                "Accept-Language": localStorage.getItem('language') ? localStorage.getItem('language') : "uz"
            }
        }).then((response) => {
            setVacancy(response.data);
        }).catch(() => {
        });

        Aos.init({duration: 1000});
    }, []);

    const displayWorks = vacancy.slice(pagesVisited, pagesVisited + worksPage).map((item, index) => {
        return <div key={index} data-aos="fade-zoom-in"
                    data-aos-easing="ease-in-back"
                    data-aos-delay="100"
                    data-aos-offset="0" className="vacancy-box">
            <div className="left-site">
                <div className="title">
                    <span className="fw-normal">{t('nameVacancy')}</span> {item.postion}
                </div>
                <div className="text-box">
                    <div className="title"> {t('title')}</div>
                    <div className="text">
                        {item.specialization}
                    </div>

                    <div className="title"> {t('title2')}</div>
                    <div className="text"> {item.education_degree}</div>

                    <div className="title">  {t('title3')}</div>
                    <div className="text">  {item.required_experience}</div>

                    <div className="title">{t('title4')}</div>
                    <div className="text">{item.salary}</div>

                    <div className="contact">
                        <a href={`tel:${item.contact}`}>
                            {t('contact')}: {item.contact}
                        </a>
                    </div>
                </div>
            </div>
            <div className="right-site">
                <div className="top">
                    <img src="./images/job-search.png" alt=""/>
                </div>
                <div className="bottom">
                    <img src="./images/bx_time.png" alt=""/>{item.date}
                </div>
            </div>
        </div>
    });
    const pageCount = Math.ceil(vacancy.length / worksPage);
    const changePage = ({selected}) => {
        setPageNumber(selected)
    };


    return (
        <>
            <div className="main-box-vacancy">
               <Navbar/>
                <div className="vacancy-title">
                    {t('Vacancy')}
                </div>
                <div className="vacancy-container">
                    {displayWorks}
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

export default Vacancy;