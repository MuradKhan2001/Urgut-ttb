import React, { useContext, useEffect, useState } from "react";
import Iframe from "react-iframe";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MyContext } from "../app/App";
import axios from "axios";
import Aos from "aos";

function Footer(props) {
  let value = useContext(MyContext);
  const [MainList, setMainList] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(`${value.url}contact/`, {
        headers: {
          "Accept-Language": localStorage.getItem("language")
            ? localStorage.getItem("language")
            : "uz",
        },
      })
      .then((response) => {
        setMainList(response.data);
      })
      .catch(() => {});

    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div className="home">
      <div className="footer" id="contact">
        <div className="top-site">
          {MainList.map((item, index) => {
            return (
              <div key={index} className="footer-box-one">
                <div className="footer-logo">
                  <img src="./images/logo3.png" alt="" />
                </div>
                <div className="location-text">
                  <div className="top">
                    <div className="icon-box">
                      <img src="./images/Vector.png" alt="" />
                    </div>
                    <div className="text-box">{t("address")}</div>
                  </div>
                  <div className="bottom">{item.address}</div>
                </div>
                <div className="location-text">
                  <div className="top">
                    <div className="icon-box">
                      <img src="./images/Vector (2).png" alt="" />
                    </div>
                    <div className="text-box">{t("phone")}</div>
                  </div>
                  <div className="bottom">
                    <a href={`tel:${item.phone1}`}>{item.phone1}</a>
                    <a href={`tel:${item.phone2}`}>{item.phone2}</a>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="footer-box-two">
            <div className="menu-text">Menu</div>
            <div className="menues">
              <p onClick={() => navigate("/")}>{t("home")}</p>
              <p onClick={() => navigate("/leaders")}>{t("organizations")}</p>
              <p onClick={() => navigate("/departments")}>{t("teachers")}</p>
              <p onClick={() => navigate("/news")}>{t("news")}</p>
              <p onClick={() => navigate("/vacancy")}>{t("Vacancy")}</p>
              <p onClick={() => navigate("/qvp")}>{t("qvp")}</p>
              <p onClick={() => navigate("/contact")}>{t("contact")}</p>
            </div>
          </div>

          {MainList.map((item, index) => {
            return (
              <div key={index} className="footer-box-three">
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
                <div className="web-site">
                  <a href="http://narpay-ttb.uz/" target="_blank">
                    <img src="./images/Vector (3).png" alt="" />
                    urgut-ttb.uz
                  </a>
                </div>
                <div className="social-media">
                  <div className="media-text">{t("follow")}</div>
                  <div className="media-icon">
                    <a href={item.telegram} target="_blank">
                      {" "}
                      <img src="./images/Vector (4).png" alt="" />{" "}
                    </a>
                    <a href={item.facebook} target="_blank">
                      {" "}
                      <img src="./images/Vector (5).png" alt="" />{" "}
                    </a>
                    <a href={item.instagram} target="_blank">
                      {" "}
                      <img src="./images/insta.png" alt="" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bottom-line"></div>
      </div>
    </div>
  );
}

export default Footer;
