import React, {useContext, useEffect, useState} from 'react';
import ReactPaginate from "react-paginate";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/footer";
import Aos from "aos";
import axios from "axios";
import {MyContext} from "../app/App";

function Departments() {
    let value = useContext(MyContext);
    const [service, setService] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const teachersPage = 4;
    const pagesVisited = pageNumber * teachersPage;

    const navigate = useNavigate();
    const {t} = useTranslation();

    useEffect(() => {
        axios.get(`${value.url}service/`, {
            headers: {
                "Accept-Language": localStorage.getItem('language') ? localStorage.getItem('language') : "uz"
            }
        }).then((response) => {
            setService(response.data);
        }).catch(() => {
        });

        Aos.init({duration: 1000});
    }, []);

    const teachers = service.slice(pagesVisited, pagesVisited + teachersPage).map((item, index) => {
        return <div key={index} data-aos="zoom-in-up" className="leaders-photo">
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
    });
    const pageCount = Math.ceil(service.length / teachersPage);
    const changePage = ({selected}) => {
        setPageNumber(selected)
    };


    return (
        <>
            <div className="department-container">
                <Navbar/>
                <div className="organization-title">
                    {t('teachers')}
                </div>
                <div className="boxes-organization">
                    <div className="box-for-org">
                        <div className="row">
                            {teachers}
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

export default Departments;