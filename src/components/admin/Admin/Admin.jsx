import {useNavigate, Route, Routes, NavLink} from "react-router-dom";
import "./admin.scss"
import {adminPageRoutes} from "../../routes/Routes";


const Admin = () => {
    const navigate = useNavigate();

    const SiteMenus = [
        {
            name: "Bosh sahifa",
            url: "/",
            img: "../images/admin/dashboard.png"
        },
        {
            name: "Biz haqimizda",
            url: "/aboutus",
            img: "../images/admin/information-button.png"
        },
        {
            name: "Aloqa",
            url: "/contacta",
            img: "../images/admin/contact.png"
        },
        {
            name: "Yangilikar",
            url: "/newsa",
            img: "../images/admin/newss.png"
        },
        {
            name: "Rasmlar",
            url: "/moments",
            img: "../images/admin/galary.png"
        },
        {
            name: "Bo'limlar",
            url: "/servicea",
            img: "../images/admin/diagram.png"
        },
        {
            name: "Xabarlar",
            url: "/message",
            img: "../images/admin/email.png"
        },
        {
            name: "Xodimlarni qo'shish",
            url: "/add-employee",
            img: "../images/admin/doctor.png"
        },
        {
            name: "QVP",
            url: "/add-qvp",
            img: "../images/admin/hospital.png"
        },
        {
            name: "Bo'sh ish o'rni ",
            url: "/add-vacancy",
            img: "../images/admin/vacancy.png"
        },
        {
            name: "Statistika qo'shish",
            url: "/add-statistic",
            img: "../images/admin/statistical.png"
        },
        {
            name: "Xavfsizlik",
            url: "/safety",
            img: "../images/admin/shield.png"
        },
    ];


    return <div className="admin-home">
        <div className="left-box">
            <div className="logo">
                <img onClick={() => navigate('/')} src="../images/logo2.png" alt=""/>
            </div>

            <div className="line"></div>

            <div className="admin-navbar">
                {
                    SiteMenus.map((item, index) => {
                        return <NavLink to={item.url} key={index}
                                        className={`nav-item ${({isActive}) => isActive ? "active" : ""}`}>
                            <img src={item.img} alt=""/>
                            <span> {item.name}</span>
                        </NavLink>
                    })
                }
            </div>
        </div>
        <div className="right-box">
            <div className="top-box">
                <div></div>
                <div className="title">
                    Admin panel
                </div>
                <div className="icons">
                    <div onClick={() => {
                        localStorage.removeItem('token');
                        window.location.pathname = "/";
                    }} className="exit"><img src="./images/logout.png" alt=""/></div>
                </div>
            </div>

            <div className="bottom-box">
                <Routes>
                    {
                        adminPageRoutes.map((route, index) => (
                            <Route key={index} {...route} />
                        ))
                    }
                </Routes>
            </div>
        </div>
    </div>
};

export default Admin