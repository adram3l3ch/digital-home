import { Route, Routes } from "react-router-dom";
import { ROUTES_DATA } from "./data";
import { NotFound } from "../pages";
import { NavigationLayout } from "../components";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<NavigationLayout routes={ROUTES_DATA} />}>
                {ROUTES_DATA.map(r => (
                    <Route path={r.link} element={r.Component ? <r.Component /> : <NotFound />} key={r.id} />
                ))}
            </Route>
        </Routes>
    );
};

export default Router;
