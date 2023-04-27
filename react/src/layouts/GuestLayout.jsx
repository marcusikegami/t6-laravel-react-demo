import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const GuestLayout = () => {
    const { token } = useStateContext();

    if (token) {
        return <Navigate to="/dashboard" replace={true} />;
    }

    return (
        <div>
            guest layout
            <Outlet />
        </div>
    )

};

export default GuestLayout;