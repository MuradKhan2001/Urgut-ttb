import React, {useContext, useEffect, useState} from 'react';
import Navbar from "../navbar/Navbar";
import Footer from "../footer/footer";
import axios from "axios";
import Aos from "aos";
import {MyContext} from "../app/App";
import {useTranslation} from "react-i18next";

function Qvp() {
    let value = useContext(MyContext);
    const {t} = useTranslation();
    const [qvp, setQvp] = useState([]);
    useEffect(() => {
        axios.get(`${value.url}qvp/`, {
            headers: {
                "Accept-Language": localStorage.getItem('language') ? localStorage.getItem('language') : "uz"
            }
        }).then((response) => {
            setQvp(response.data);
        }).catch(() => {
        });

        Aos.init({duration: 1000});
    }, []);

    return (
        <>
            <div className="qvp-container">
                <Navbar/>
                <div className="table-content">
                    <table>
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>{t('address')}</th>
                            <th>{t('doctor2')}</th>
                            <th>{t('phone')}</th>
                        </tr>
                        </thead>

                        <tbody>
                        {qvp.map((item, index) => {
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    {item.address} <br/>
                                </td>
                                <td>{item.doctor}</td>
                                <td>
                                    {item.contact}
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
                <Footer/>
            </div>
        </>
    );
}

export default Qvp;