import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider, QueryClient } from 'react-query'
import Layout from "pages/Layout";
import Login from "pages/Login";
import Register from "pages/Register";
import Home from "pages/Home";
import CampaignLanding from "pages/CampaignLanding";
import Profile from "pages/Profile";
import CampaignDetails from "pages/CampaignDetails";
import * as ROUTES from 'constants/routes';
import { LoggedOutRoute, ProtectedRoute } from "helpers/routes";

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path={ROUTES.HOME} element={<Layout />} >
          <Route index element={<Home />} />
          <Route
            path={ROUTES.CAMPAIGNS}
            element={
              <ProtectedRoute outlet={<CampaignLanding />} />
            }
          />
          <Route
            path={ROUTES.CAMPAIGN}
            element={
              <ProtectedRoute outlet={<CampaignDetails />} />
            }
          />
          <Route
            path={ROUTES.PROFILE}
            element={
              <ProtectedRoute outlet={<Profile />} />
            }
          />
          <Route
            path={ROUTES.LOGIN}
            element={
              <LoggedOutRoute outlet={<Login />} />
            }
          />
          <Route
            path={ROUTES.REGISTER}
            element={
              <LoggedOutRoute outlet={<Register />} />
            }
          />
        </Route>
        <Route path="*" element={<Navigate replace to={ROUTES.HOME} />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App;
