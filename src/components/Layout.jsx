import React from "react";
import Header from "./Header";

const Layout = (props) => {
  return (
    <main className="App">
      <Header />
      <section>{props.children}</section>
    </main>
  );
};

export default Layout;
