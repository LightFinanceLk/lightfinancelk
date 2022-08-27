import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Layout = (props) => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <main className={`App ${isAuth ? "authenticated" : ""}`}>
      <Header />
      <section>
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
