import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import logo from "./../assets/img/logo.png";
import config from "../config";
import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.role);
  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const profileImage = useSelector((state) => state.user.image);

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("lf-user");
    dispatch(authActions.logout());
    navigate("/login");
  };

  return (
    <>
      {isAuth && (
        <header className="border-bottom header">
          <div className="container-fluid">
            <div className="d-md-flex flex-wrap align-items-center justify-content-center justify-content-lg-start header__wrapper">
              <Link
                to="/"
                className="d-md-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
              >
                <figure className="figure header__logo">
                  <img src={logo} alt="" className=" img-fluid" />
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
                {userRole === "2022" && (
                  <>
                    <li>
                      <NavLink to="/account">
                        <span className="nav-link px-2 link-secondary">
                          Accounts
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/record/bulk-records">
                        <span className="nav-link px-2 link-secondary">
                          Bulk Records
                        </span>
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
              <ul className="nav col-12 col-lg-auto mb-md-0">
                <li style={{ marginLeft: "auto" }}>
                  <NavLink to="/profile">
                    <span className="header__profile-image">
                      {profileImage ? (
                        <img
                          src={`${config.api.BASE_URL}/${profileImage}`}
                          alt=""
                        />
                      ) : (
                        <img
                          src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`}
                          alt=""
                        />
                      )}
                    </span>
                  </NavLink>
                </li>
                <li>
                  <button
                    className="px-2 btn btn-outline-primary"
                    href="#"
                    onClick={logoutHandler}
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
