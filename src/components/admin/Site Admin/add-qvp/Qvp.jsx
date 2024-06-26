import "./style.scss";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../../app/App";

const Addqvp = () => {
  let value = useContext(MyContext);
  const [MainList, setMainList] = useState([]);

  const [addressUz, setAddressUz] = useState("");
  const [doctorUz, setDoctorUz] = useState("");

  const [addressRu, setAddressRu] = useState("");
  const [doctorRu, setDoctorRu] = useState("");

  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  
  const [qvp, setQvp] = useState(1);

  

  const getImage = (e) => {
    setImage(e.target.files[0]);
  };

  const getList = (lng) => {
    axios
      .get(`${value.url}qvp/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Accept-Language": lng ? lng : "uz",
        },
      })
      .then((response) => {
        setMainList(response.data);
      })
      .catch((error) => {
        if (error.response.statusText == "Unauthorized") {
          window.location.pathname = "/";
          localStorage.removeItem("token");
        }
      });
  };

  useEffect(() => {
    getList();
  }, []);

  const AddCars = () => {
    if (
      addressUz.trim().length > 0 &&
      doctorUz.trim().length > 0 &&
      contact.trim().length > 0 &&
      addressRu.trim().length > 0 &&
      doctorRu.trim().length > 0 &&
      name.trim().length > 0
    ) {
      
      let Post = new FormData();

      const  translations = {
        ru: {
          doctor: doctorRu,
          address: addressRu,
          name:name
        },
        uz: {
          doctor: doctorUz,
          address: addressUz,
          name:name
        },
      }

      Post.append("translations", JSON.stringify(translations));
      Post.append("image", image);
      Post.append("contact", contact);
      Post.append("type", qvp);


      axios
        .post(`${value.url}qvp/`, Post, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          getList();
          setAddressUz("");
          setDoctorUz("");
          setAddressRu("");
          setDoctorRu("");
          setContact("");
          setName("");
          setImage("");

          document.getElementById("addressUz").value = "";
          document.getElementById("addressRu").value = "";
          document.getElementById("doctorUz").value = "";
          document.getElementById("doctorRu").value = "";
          document.getElementById("contact").value = "";
          document.getElementById("name").value = "";
          document.getElementById("image").value = "";
        })
        .catch((error) => {
          if (error.response.statusText == "Unauthorized") {
            window.location.pathname = "/";
            localStorage.removeItem("token");
          }
        });
    } else alert("Formani toldiring");
  };

  const DelCar = (id) => {
    axios
      .delete(`${value.url}qvp/${id}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        getList();
      })
      .catch(() => {});
  };

  return (
    <div className="qvp-box">
      <div className="header-side">
          <div onClick={()=> setQvp(1)} className={`tab-item ${qvp === 1 ? "tab-item-active" : ""}`}>KTMP</div>
          <div onClick={()=> setQvp(2)} className={`tab-item ${qvp === 2 ? "tab-item-active" : ""}`}>OP</div>
          <div onClick={()=> setQvp(3)} className={`tab-item ${qvp === 3 ? "tab-item-active" : ""}`}>OSHP</div>
      </div>
      <div className="header-side">
        <div className="filter-box">
          <div className="inputs">
            <select
              name="partner"
              id="partner"
              onChange={(e) => {
                getList(e.target.value);
              }}
            >
              <option value={"uz"}>UZ</option>
              <option value={"ru"}>RU</option>
            </select>

            <input
              id="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Qvp nomi"
              type="text"
            />

            <input
              id="image"
              onChange={getImage}
              type="file"
            />

            <input
              id="addressUz"
              onChange={(e) => setAddressUz(e.target.value)}
              placeholder="Manzil nomi"
              type="text"
            />

            <input
              id="addressRu"
              onChange={(e) => setAddressRu(e.target.value)}
              placeholder="Адрес"
              type="text"
            />

            <input
              id="doctorUz"
              onChange={(e) => setDoctorUz(e.target.value)}
              placeholder="Biriktirilgan shifokor"
              type="text"
            />

            <input
              id="doctorRu"
              onChange={(e) => setDoctorRu(e.target.value)}
              placeholder="Прикрепленный врач"
              type="text"
            />

            <input
              id="contact"
              onChange={(e) => setContact(e.target.value)}
              placeholder="Murojaat uchun tel"
              type="text"
            />
          </div>
          <div onClick={AddCars} className="filter-btn">
            <span>Qo'shish</span>
          </div>
        </div>
      </div>

      <div className="table-content">
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>QVP nomi</th>
              <th>Manzil</th>
              <th>Biriktirilgan shifokor</th>
              <th>Murojaat uchun tel</th>
              <th>O'chirish</th>
            </tr>
          </thead>

          <tbody>
            {MainList.map((item, index) => {
             if(item.type == qvp){
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.doctor}</td>
                  <td>{item.contact}</td>
                  <td>
                    <div>
                      <img
                        onClick={() => DelCar(item.id)}
                        src="../images/delete.png"
                        alt=""
                      />
                    </div>
                  </td>
                </tr>
              );
             }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Addqvp;
