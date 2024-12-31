import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "../Pages/Login";
import Register from "../Pages/Register";
import DashBoardLayout from "../Pages/Dashboard";
import OrdersAll from "../Pages/Dashboard/OrdersAll";
import General from "../Pages/Dashboard/Settings/General";
import DashBoradIndexPage from "../Pages/Dashboard/Home";
import ProtectedRoute from "../Pages/Dashboard/ProtectedR";
import LogOut from "../Pages/Dashboard/Logout";
import Packages from "../Pages/Dashboard/Packages";
import ViewPackage from "../Pages/Dashboard/ViewPackage";
import ADD_NEW_PKG from "../Pages/Dashboard/ADD_NEW_PKG";
import OrderView from "../Pages/Dashboard/OrderView";
import All_Users from "../Pages/Dashboard/All_Users";
import OrderPending from "../Pages/Dashboard/OrderPending";
import OrderComplete from "../Pages/Dashboard/OrderComplete";
import VIEW_SINGLE_USER from "../Pages/Dashboard/ViewUser";
import Change_Password from "../Pages/Dashboard/Settings/Change_Password";
import Setting_Layout from "../Pages/Dashboard/Settings/SettingLayout";
import AdminProfile from "../Pages/AdminProfile";
import CreateNewEmployee from "../Pages/Dashboard/Employee/CreateNewEmployee";
import EmployeeLists from "../Pages/Dashboard/Employee/EmployeeLists";
import ViewEmployee from "../Pages/Dashboard/Employee/View_Emplyoyee";

const DashBoardRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashBoradIndexPage />} />
          <Route path="admin" element={<AdminProfile />} />
          <Route path="users" element={<All_Users />} />
          <Route path="user/:USER_ID" element={<VIEW_SINGLE_USER />} />
          <Route path="order" element={<OrdersAll />} />
          <Route path="order-pending" element={<OrderPending />} />
          <Route path="order-complete" element={<OrderComplete />} />
          <Route path="Order/:ORDER_ID" element={<OrderView />} />
          <Route path="package" element={<Packages />} />
          <Route path="add-new-package" element={<ADD_NEW_PKG />} />
          <Route path="employee/:EMP_ID" element={<ViewEmployee />} />
          <Route path="employee" element={<EmployeeLists />} />
          <Route path="new-employee" element={<CreateNewEmployee />} />
          <Route path="package/:PKG_ID" element={<ViewPackage />} />
          <Route path="/dashboard/logout" element={<LogOut />} />
          <Route path="/dashboard/settings" element={<Setting_Layout />}>
            <Route path="general" index element={<General />} />
            <Route path="change-password" element={<Change_Password />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

// /dashboard/settings/change-password

export default DashBoardRoutes;
