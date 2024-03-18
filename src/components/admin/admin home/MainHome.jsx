import "./adminHome.scss";
import Iframe from "react-iframe";
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../app/App";
import axios from "axios";

const MainHome = () => {
  let value = useContext(MyContext);
  const [MainList, setMainList] = useState({
    doctors: 0,
    services: 0,
    patients: 0,
  });

  useEffect(() => {
    axios
      .get(`${value.url}home/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        let newList = {
          doctors: response.data[0] ? response.data[0].doctors : 0,
          services: response.data[0] ? response.data[0].services : 0,
          patients: response.data[0] ? response.data[0].patients : 0
        };
        setMainList(newList);
      })
      .catch((error) => {
        if (error.response.statusText == "Unauthorized") {
          window.location.pathname = "/";
          localStorage.removeItem("token");
        }
      });
  }, []);

  return (
    <div className="admin-home-container">
      <div className="statistic">
        <div className="statistic-box">
          <div className="title">Shifokorlar soni:</div>
          <div className="count">{MainList.doctors}</div>
        </div>

        <div className="statistic-box">
          <div className="title">Bo'limlar soni:</div>
          <div className="count">{MainList.services}</div>
        </div>

        <div className="statistic-box">
          <div className="title">Bemorlar soni:</div>
          <div className="count">{MainList.patients}</div>
        </div>
      </div>

      <div className="map-box">
        <Iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3081.741920135303!2d67.2302038566023!3d39.42996004631751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMznCsDI1JzQ5LjUiTiA2N8KwMTMnNTQuNCJF!5e0!3m2!1sru!2s!4v1710745737065!5m2!1sru!2s"
          width={"100%"}
          height={"100%"}
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></Iframe>
      </div>
    </div>
  );
};

export default MainHome;
