import { Navigate, Route, Routes } from "react-router-dom";
import { FC } from "react";
import { WebChatsPage, LoginPage } from "pages";
import { Header, Footer } from "components";
import { Spinner } from "ui";

interface IRoutesComponent {
    isAuth: boolean;
    isLoading: boolean;
}

const RoutesComponent: FC<IRoutesComponent> = ({ isAuth, isLoading }) => {
    if (isLoading) {
        return (
            <div className="relative h-screen text-center">
                <Spinner />
            </div>
        );
    }

    return (
        <Routes>
            {isAuth ? (
                <>
                    <Route
                        path="/"
                        element={
                            <>
                                <Header />
                                <WebChatsPage />
                                <Footer />
                            </>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </>
            ) : (
                <>
                    <Route
                        path="/login"
                        element={
                            <>
                                <LoginPage />
                                <Footer />
                            </>
                        }
                    />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </>
            )}
        </Routes>
    );
};

export default RoutesComponent;
