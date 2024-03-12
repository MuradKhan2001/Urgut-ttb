import React, {useMemo, useState, createContext} from "react";
import {Routes, Route} from "react-router-dom";
import NotFound from "../notFound/NotFound";
import {publicRoutes, adminRoutes} from "../routes/Routes";

export const MyContext = createContext();

const App = () => {

    const [url, setUrl] = useState('http://46.101.190.197/api/v1/');

    const admin = useMemo(() => localStorage.getItem('token'), []);

    const routes = useMemo(() => {
        if (admin) return adminRoutes;
        return publicRoutes
    }, [admin]);

    return <>
        <MyContext.Provider value={{
            url
        }}>
            <Routes>
                {
                    routes.map((route, index) => (
                        <Route key={index} {...route} />
                    ))
                }
                <Route path={'*'} element={<NotFound/>}/>
            </Routes>

        </MyContext.Provider>
    </>
};

export default App;