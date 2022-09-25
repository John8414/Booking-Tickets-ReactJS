import React, { lazy } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'

const AdminGuard = lazy(() => import('guards/admin.guard'))
const AuthGuard = lazy(() => import('guards/auth.guard'))
const NoAuthGuard = lazy(() => import('guards/no-auth.guard'))
const AdminLayout = lazy(() => import('layouts/admin'))
const Booking = lazy(() => import('pages/booking/booking'))
const Login = lazy(() => import('pages/login/login'))
const MovieManagement = lazy(() => import('pages/movie-management/movie-management'))
const HomeLayout = lazy(() => import('layouts/home'))
const Home = lazy(() => import('pages/home/home'))
const MovieDetail = lazy(() => import('pages/movie-detail/movie-detail'))
const CreateMovie = lazy(() => import('pages/create-movie/create-movie'))
const ProfileGuard = lazy(() => import('guards/profile.guard'))
const CreateShowtime = lazy(() => import('pages/create-showtime/create-showtime'))
const CreateUser = lazy(() => import('pages/create-user/create-user'))
const RegisterForm = lazy(() => import('pages/register-form/register-form'))
const UpdateMovie = lazy(() => import('pages/update-movie/update-movie'))
const UpdateUser = lazy(() => import('pages/update-user/update-user'))
const UserInfo = lazy(() => import('pages/user-info/user-info'))
const UserManagement = lazy(() => import('pages/user-management/user-management'))

export default function Router() {
    const routing = useRoutes([
        {
            path: '/',
            element: <HomeLayout />,
            children: [
                {
                    path: '/',
                    element: <Home />,
                },
                {
                    path: '/movie/:movieId',
                    element: <MovieDetail />,
                },
                {
                    path: '/',
                    element: <AuthGuard />,
                    children: [
                        {
                            path: '/booking/:maLichChieu',
                            element: <Booking />,
                        },
                    ],
                },
                {
                    path: '/',
                    element: <NoAuthGuard />,
                    children: [
                        {
                            path: '/login',
                            element: <Login />,
                        },
                    ],
                },
                {
                    path: '/',
                    element: <ProfileGuard />,
                    children: [{ path: '/profile', element: <UserInfo /> }],
                },
                {
                    path: '/register-form',
                    element: <RegisterForm />,
                },
            ],
        },
        {
            path: '/admin',
            element: <AdminLayout />,
            children: [
                {
                    path: '/admin',
                    element: <AdminGuard />,
                    children: [
                        { path: '/admin/', element: <Navigate to="/admin/movie-management" /> },
                        {
                            path: '/admin/movie-management',
                            element: <MovieManagement />,
                        },
                        {
                            path: '/admin/movie-management/create',
                            element: <CreateMovie />,
                        },
                        {
                            path: '/admin/movie-management/:movieId/update',
                            element: <UpdateMovie />,
                        },
                        {
                            path: '/admin/movie-management/showtime/:movieId',
                            element: <CreateShowtime />,
                        },
                        {
                            path: '/admin/user-management',
                            element: <UserManagement />,
                        },
                        {
                            path: '/admin/user-management/create',
                            element: <CreateUser />,
                        },
                        {
                            path: '/admin/user-management/update/:userId',
                            element: <UpdateUser />,
                        },
                    ],
                },
            ],
        },
    ])

    return routing
}
