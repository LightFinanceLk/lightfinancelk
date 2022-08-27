import React from "react";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";

const Layout = (props) => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <main className={`App ${isAuth ? "authenticated" : ""}`}>
      <Header />
      <section>{props.children}</section>
    </main>
  );
};

export default Layout;
