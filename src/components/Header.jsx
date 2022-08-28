import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGear } from "@fortawesome/free-solid-svg-icons";
import logo from "./../assets/img/logo.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.role);

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
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
                      <NavLink to="/account/create">
                        <span className="nav-link px-2 link-secondary">
                          Accounts
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/record/create-bulk">
                        <span className="nav-link px-2 link-secondary">
                          Records
                        </span>
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
              <ul className="nav col-12 col-lg-auto mb-md-0">
                <li style={{ marginLeft: "auto" }}>
                  <NavLink to="/profile">
                    <span className="nav-link px-2 link-secondary">
                      Hello {isAuth ? "authenticated" : "not authenticated"} !!{" "}
                      <FontAwesomeIcon icon={faUserGear} />
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
