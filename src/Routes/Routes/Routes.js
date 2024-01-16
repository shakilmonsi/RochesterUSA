import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import MyAppointment from "../../Pages/Dashboard/MyAppointment/MyAppointment";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AddDoctors from "../../Pages/Addoctors/AddDoctors";
import Managedoctor from "../../Pages/Managedoctor/Managedoctor";
import MakeAppointment from "../../Pages/Home/MakeAppointment/MakeAppointment";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import DisplayError from "../../Pages/DiasplayError/DisplayError";
import PaidPayment from "../../Pages/Dashboard/Payment/PayPayment/PaidPayment";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>, 
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/about',
                element:<MakeAppointment></MakeAppointment>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/appointment',
                element: <Appointment></Appointment>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard',
                element: <MyAppointment></MyAppointment>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: '/dashboard/adddoctor',
                element: <AdminRoute><AddDoctors></AddDoctors></AdminRoute>
            },
            {
                path: '/dashboard/managedoctor',
                element: <AdminRoute><Managedoctor></Managedoctor></AdminRoute>
            },
            {
                path: '/dashboard/paidpayment',
                element: <AdminRoute>   <PaidPayment></PaidPayment> </AdminRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,

                loader: ({params}) => fetch(`http://localhost:5000/bookings/${params.id}`)            },
        ]
    }
])

export default router;