import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faRightFromBracket,
  faRightToBracket,
  faUser,
  faGear,
  faBars,
  faCartShopping,
  faCartPlus,
  faMagnifyingGlass,
  faCircleChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/reducers/userReducer";
import { RootState } from "../redux/store";
import { theme, themeStyles } from "../utils/colors";
library.add(
  faRightFromBracket,
  faRightToBracket,
  faUser,
  faGear,
  faBars,
  faCartShopping,
  faCartPlus,
  faMagnifyingGlass,
  faCircleChevronDown
);

const Header = () => {
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    authRedu: { userAuth: user },
    cartRedu: { cartList },
  } = useSelector((state: RootState) => state);
  const logoutEvent = () => {
    dispatch(logout(undefined));
  };
console.log(user)
  return (
    <>
      <nav>
        <div className="navigation-container">
          <div className="drop-menu">
            <FontAwesomeIcon className="dropbtn-menu" icon={faBars} />
            <div className="drop-menu-content">
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
            </div>
          </div>
          <div className="logo">Shop(^V^)</div>
          <div className="searchbar">
            <input
              type="search"
              name="serach"
              placeholder="Search Item"
              value={searchKey}
              onChange={(e) => {
                e.preventDefault();
                setSearchKey(e.target.value);
                navigate(`/products/search/${e.target.value}`);
              }}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          <div className="nav-bar">
            <nav>
              <ul className="topnav">
                <li>
                  <Link to="/products">Products</Link>
                </li>
                <li>
                  <Link to="/">Home</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="dropdown-action">
            <FontAwesomeIcon icon={faCircleChevronDown} />
            <div className="dropdown-action-content">
              {user ? (
                <>
                  {Object.keys(cartList).length > 0 ? (
                    <>
                      <p className="number-of-casts">
                        {Object.keys(cartList).length}
                      </p>
                      <FontAwesomeIcon
                        icon={faCartPlus}
                        onClick={() => {
                          navigate("/carts");
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        onClick={() => {
                          alert("Carts is empty add to cart");
                        }}
                      />
                    </>
                  )}
                  <FontAwesomeIcon
                    icon={faUser}
                    onClick={() => {
                      navigate("/login");
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faGear}
                    onClick={() => {
                      const activeTheme = theme();
                      themeStyles.backgroundColor = "#fff";
                      localStorage.setItem(
                        "theme",
                        activeTheme == "dark" ? "light" : "dark"
                      );
                      theme();
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    onClick={logoutEvent}
                  />
                </>
              ) : (
                <FontAwesomeIcon
                  icon={faRightToBracket}
                  onClick={() => {
                    navigate("/login");
                  }}
                />
              )}
            </div>
          </div>
          <div className="actionbar">
            {user ? (
              <>
                {Object.keys(cartList).length > 0 ? (
                  <>
                    <p className="number-of-casts">
                      {Object.keys(cartList).length}
                    </p>
                    <FontAwesomeIcon
                      icon={faCartPlus}
                      onClick={() => {
                        navigate("/carts");
                      }}
                    />
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      onClick={() => {
                        alert("Carts is empty add to cart");
                      }}
                    />
                  </>
                )}
                <FontAwesomeIcon
                  icon={faUser}
                  onClick={() => {
                    navigate("/profile");
                  }}
                />
                <FontAwesomeIcon
                  icon={faGear}
                  onClick={() => {
                    const activeTheme = theme();
                    localStorage.setItem(
                      "theme",
                      activeTheme == "dark" ? "light" : "dark"
                    );
                    theme();
                  }}
                />
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  onClick={logoutEvent}
                />
              </>
            ) : (
              <FontAwesomeIcon
                icon={faRightToBracket}
                onClick={() => {
                  navigate("/login");
                }}
              />
            )}
          </div>
        </div>
        <Outlet />
      </nav>
    </>
  );
};

export default Header;
