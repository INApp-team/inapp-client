import "./global.css";
import RoutesComponent from "./routes";
import useAuthStore from "store/authStore";
import { useEffect } from "react";

const App = () => {
    const { checkAuth, isAuth, isLoading } = useAuthStore((state) => state);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            checkAuth();
        }
    }, []);

    return (
        <>
            <RoutesComponent isAuth={isAuth} isLoading={isLoading} />
        </>
    );
};

export default App;
