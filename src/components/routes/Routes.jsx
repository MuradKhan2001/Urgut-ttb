import Home from "../home/Home";
import Organizations from "../leaders/organizations";
import Departments from "../departments/departments";
import News from "../news/News";
import Vacancy from "../vacancy/vacancy";
import AboutEmployee from "../about-employee/about-employee";
import Contact from "../contact/Contact";
import Loader from "../loader/Loader";
import AboutService from "../about-service/About-Service";
import AboutNews from "../about-news/About-news";
import Aboutus from "../admin/Site Admin/aboutus/Aboutus";
import ContactA from "../admin/Site Admin/contact/ContactA";
import ServiceA from "../admin/Site Admin/service/ServiceA";
import Message from "../admin/Site Admin/massages/Message";
import Login from "../login/Login";
import Admin from "../admin/Admin/Admin";
import MainHome from "../admin/admin home/MainHome";
import NewsA from "../admin/Site Admin/news/News";
import Safety from "../admin/safety/Safety";
import Qvp from "../qvp/QVP";
import AddEmployee from "../admin/Site Admin/add-employee/AddEmployee";
import Addqvp from "../admin/Site Admin/add-qvp/Qvp";
import AddVacancy from "../admin/Site Admin/add-vacancy/Addvacancy";
import Statistic from "../admin/Site Admin/statistic/statisrtic";
import Moments from "../admin/Site Admin/moments/Moments";

export const publicRoutes = [
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/leaders",
        element:<Organizations/>
    },
    {
        path:"/departments",
        element:<Departments/>
    },
    {
        path:"/news",
        element:<News/>
    },
    {
        path:"/vacancy",
        element:<Vacancy/>
    },
    {
        path:"/employee",
        element:<AboutEmployee/>
    },
    {
        path:"/contact",
        element:<Contact/>
    },
    {
        path:"/loader",
        element:<Loader/>
    },
    {
        path:"/about-service",
        element:<AboutService/>
    },
    {
        path:"/about-news",
        element:<AboutNews/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/qvp",
        element:<Qvp/>
    }
];

export const adminRoutes = [
    {
        path:"/*",
        element: <Admin/>
    },
];

export const adminPageRoutes = [
    {
        path:"/",
        element: <MainHome/>
    },
    {
        path:"/aboutus",
        element: <Aboutus/>
    },
    {
        path:"/contacta",
        element: <ContactA/>
    },
    {
        path:"/newsa",
        element: <NewsA/>
    },
    {
        path:"/servicea",
        element: <ServiceA/>
    },
    {
        path:"/message",
        element: <Message/>
    },
    {
        path:"/add-employee",
        element: <AddEmployee/>
    },
    {
        path:"/add-qvp",
        element: <Addqvp/>
    },
    {
        path:"/add-vacancy",
        element: <AddVacancy/>
    },
    {
        path:"/add-statistic",
        element: <Statistic/>
    },
    {
        path:"/moments",
        element: <Moments/>
    },
    {
        path:"/safety",
        element: <Safety/>
    }
];