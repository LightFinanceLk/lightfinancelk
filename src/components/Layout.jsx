import React from "react";

const Layout = (props) => {
  return (
    <main className="App">
      <div className="container">{props.children}</div>
    </main>
  );
};

export default Layout;
