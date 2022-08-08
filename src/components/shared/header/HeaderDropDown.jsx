import React from "react";

const HeaderDropDown = (props) => {
  return (
    <div className="dropdown text-end">
      <button className="d-block link-dark text-decoration-none dropdown-toggle">
        <img
          src="https://via.placeholder.com/100x100.jpg?text=User"
          alt="mdo"
          width="32"
          height="32"
          className="rounded-circle"
        />
      </button>
      <ul className="dropdown-menu text-small">{props.children}</ul>
    </div>
  );
};

export default HeaderDropDown;
