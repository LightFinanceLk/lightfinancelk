import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import HeaderDropDown from "./shared/header/HeaderDropDown";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import logo from "./../assets/img/logo.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(authActions.logout());
    navigate("/login");
  };

  return (
    <>
      {isAuth && (
        <header className="p-3 mb-3 border-bottom header">
          <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <Link
                to="/"
                className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
              >
                <figure className="figure">
                  <img src={logo} alt="" className="header__logo img-fluid" />
                </figure>
              </Link>

              <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li>
                  <NavLink to="/">
                    <span className="nav-link px-2 link-secondary">
                      Dashboard
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/account">
                    <span className="nav-link px-2 link-secondary">
                      Accounts
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/record">
                    <span className="nav-link px-2 link-secondary">
                      Records
                    </span>
                  </NavLink>
                </li>
              </ul>

              <div className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                <button type="button" className="btn btn-primary">
                  + Record
                </button>
              </div>

              {isAuth ? "authenticated" : "not authenticated"}
              <HeaderDropDown>
                <li>
                  <NavLink to="/profile">
                    <span className="dropdown-item">Settings</span>
                  </NavLink>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={logoutHandler}>
                    Log Out
                  </a>
                </li>
              </HeaderDropDown>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
