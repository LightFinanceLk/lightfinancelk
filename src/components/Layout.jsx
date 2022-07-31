import React from "react";
import Header from "./Header";

const Layout = (props) => {
  return (
    <main className="App">
      <Header />
      <div className="container">{props.children}</div>
    </main>
  );
};

export default Layout;
