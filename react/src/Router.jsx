import { Navigate, createBrowserRouter } from 'react-router-dom';
import Login from './views/Login.jsx';
import Signup from './views/Signup.jsx';
import Users from './views/Users.jsx';
import UserForm from './views/UserForm.jsx';
import Dashboard from './views/Dashboard.jsx';
import UserLayout from './layouts/UserLayout.jsx';
import GuestLayout from './layouts/GuestLayout.jsx';

const router = createBrowserRouter([
    {
        path: '*',
        element: <div>404 Page Not Found</div>
    },
    {
        path: '/',
        element: <UserLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to='/dashboard' />
            },
            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate"/>
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate" />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },

        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
        ]
    },
])

export default router;
