import { Routes, Route } from "react-router-dom";

import LandingPage from "../pages/Landing/Landing";
import Flight from "../pages/GenratedFlightAI/Flight";
import Loader from "../components/Loader/Loader";
import AuthPage from "../pages/AuthenticationPage/AuthPage";
import MainLayout from "../layouts/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/flight" element={<Flight />} />
      </Route>

      <Route path="/auth" element={<AuthPage />} />
      <Route path="/loading" element={<Loader />} />
    </Routes>
  );
};

export default AppRoutes;
