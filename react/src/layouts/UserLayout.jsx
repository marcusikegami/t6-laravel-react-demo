import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const UserLayout = () => {
    const { currentUser, token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" replace={true} />;
    }

    return (
        <div>
            <Outlet />
        </div>
    )

};

export default UserLayout;