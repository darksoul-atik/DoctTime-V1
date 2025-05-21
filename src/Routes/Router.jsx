import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Bookings from "../Pages/Bookings/Bookings";
import Blogs from "../Pages/Blogs/Blogs";
import Contact from "../Pages/Contact/Contact";
import Loader from "../UI/Loader";
import DoctorDetails from "../Pages/DoctorDetails/DoctorDetails";
import ErrorPage from "../UI/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <MainLayout />,
    hydrateFallbackElement: <Loader />,
    children: [
      {
        index: true,
        loader: () => fetch("../doctorAPI.json"),
        hydrateFallbackElement: <Loader />,
        element: <Home />,
      },
      {
        path: "/bookings",
        hydrateFallbackElement: <Loader />,
        element: <Bookings />,
      },
      {
        path: "/blogs",
        loader: () => fetch("../blogsAPI.json"),
        hydrateFallbackElement: <Loader />,
        element: <Blogs />,
      },
      {
        path: "/error404",
        hydrateFallbackElement: <Loader />,
        element: <Contact />,
      },
      {
        path: "/doctor/:registrationNumber",
        loader: () => fetch("../doctorAPI.json"),
        hydrateFallbackElement: <Loader />,
        element: <DoctorDetails />,
      },
      {
        path: "/error404",
        hydrateFallbackElement: <Loader />,
        element: <ErrorPage />,
      },
    ],
  },
]);
