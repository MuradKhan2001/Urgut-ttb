import React, {useContext, useEffect, useState} from 'react';
import ReactPaginate from "react-paginate";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/footer";
import Aos from "aos";
import axios from "axios";
import {MyContext} from "../app/App";


function Organizations() {
    let value = useContext(MyContext);
    const [pageNumber, setPageNumber] = useState(0);
    const worksPage = 4;
    const pagesVisited = pageNumber * worksPage;
    const [doctors, setDoctors] = useState([]);

    const navigate = useNavigate();
    const {t} = useTranslation();

    useEffect(() => {
        axios.get(`${value.url}doctor/`, {
            headers: {
                "Accept-Language": localStorage.getItem('language') ? localStorage.getItem('language') : "uz"
            }
        }).then((response) => {
            setDoctors(response.data);
        }).catch(() => {
        });

        Aos.init({duration: 1000});
    }, []);

    const displayWorks = doctors.filter((item)=> item.user_type === "Doctor").slice(pagesVisited, pagesVisited + worksPage).map((item, index) => {
        return <div key={index} data-aos="zoom-in-up" className="leaders-photo">
            <img src={item.image} alt=""/>
            <div className="name-org">
                <div className="name">
                    {item.name}
                </div>
                <div className="position">
                    {item.position}
                </div>
            </div>
            <div className="about-doctor">
                <div onClick={() => {
                    sessionStorage.setItem("doctor", item.id)
                    navigate("/employee")
                }} className="nore-btn">
                    {t('more')}
                    <img src="./images/more2.png" alt=""/>
                </div>
            </div>
        </div>
    });
    const pageCount = Math.ceil(doctors.filter((item)=> item.user_type === "Doctor").length / worksPage);
    const changePage = ({selected}) => {
        setPageNumber(selected)
    };



    return (
        <>
            <div className="main-box-organization">
                <Navbar/>

                <div className="organization-title">
                    {t('organizations')}
                </div>
                <div className="boxes-organization">
                    <div className="box-for-org">
                        <div className="row">
                            {displayWorks}
                        </div>
                    </div>
                    <ReactPaginate
                        previousLabel={<img src="../images/work-pagination-prev.png" alt=""/>}
                        nextLabel={<img src="../images/work-pagination-next.png" alt=""/>}
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

export default Organizations;