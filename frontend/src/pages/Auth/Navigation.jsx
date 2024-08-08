import { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { AiOutlineHome, AiOutlineShop, AiOutlineLogin } from "react-icons/ai";
import { IoMdMenu } from "react-icons/io";
import { CiUser, CiShoppingCart } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { FaHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/userApiSlice.js";
import { logout } from "../../redux/features/auth/authSlice.js";

import "./style.css";
import Hambergar from "./../../components/Hambergar";
import { lastName } from "./../../utils/string";
import FavoritesProductCount from "./../../components/FavoritesProductCount";
import CartCount from "./../../components/CartCount";

const Navigation = () => {
  const [activeMenu, setActiveMenu] = useState("home");
  const [smMenuShow, setSmMenuShow] = useState(false);
  const toggleSmMenuShow = () => {
    setSmMenuShow(!smMenuShow);
  };
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(userInfo);
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const [showDropDown, setDropDown] = useState(false);

  const toggleDropDown = () => {
    setDropDown(!showDropDown);
  };

  return (
    <div className={` navigation-container`}>
      <div className={`navigate-menu `}>
        <NavLink
          to="/"
          className="nav-link relative"
          style={({ isActive }) => {
            if (isActive) {
              setActiveMenu("home");
              return {};
            }
          }}
        >
          {" "}
          {activeMenu === "home" && (
            <div className="absolute w-[25px] h-[3px]  md:w-[3px] md:h-[25px] bg-pink-600 rounded-md left-[12px] bottom-[-10px] md:left-0 md:top-[15px] animation-pop"></div>
          )}
          <AiOutlineHome className="nav-link-icon" />
          <span className="nav-link-name">Home</span>
        </NavLink>

        <NavLink
          to="/shop"
          className="nav-link relative"
          style={({ isActive }) => {
            if (isActive) {
              setActiveMenu("shop");
              return {};
            }
          }}
        >
          {activeMenu === "shop" && (
            <div className="absolute w-[25px] h-[3px]  md:w-[3px] md:h-[25px] bg-pink-600 rounded-md left-[12px] bottom-[-10px] md:left-0 md:top-[15px] animation-pop"></div>
          )}
          <AiOutlineShop className="nav-link-icon" />
          <span className="nav-link-name">Shop</span>
        </NavLink>

        <NavLink
          to="/cart"
          className="nav-link !relative"
          style={({ isActive }) => {
            if (isActive) {
              setActiveMenu("cart");
              return {};
            }
          }}
        >
          {activeMenu === "cart" && (
            <div className="absolute w-[25px] h-[3px]  md:w-[3px] md:h-[25px] bg-pink-600 rounded-md left-[12px] bottom-[-10px] md:left-0 md:top-[15px] animation-pop"></div>
          )}
          <CiShoppingCart className="nav-link-icon" />
          <span className="nav-link-name">Cart</span>
          <CartCount />
        </NavLink>

        <NavLink
          to="/favorites"
          className="nav-link !relative"
          style={({ isActive }) => {
            if (isActive) {
              setActiveMenu("favorites");
              return {};
            }
          }}
        >
          {activeMenu === "favorites" && (
            <div className="absolute w-[25px] h-[3px]  md:w-[3px] md:h-[25px] bg-pink-600 rounded-md left-1/2 translate-x-[-50%] bottom-[-10px] md:left-0 md:top-[15px] animation-pop"></div>
          )}
          <FaHeart className="nav-link-icon" />
          <span className="nav-link-name">Favorites</span>
          <FavoritesProductCount />
        </NavLink>
      </div>

      {userInfo && (
        <div className="profile-menu hidden md:block">
          {showDropDown && (
            <ul
              onMouseLeave={() => setDropDown(false)}
              className={`drop-down-menu   ${
                userInfo.isAdmin ? "top-[-290px]" : "top-[-90px]"
              }`}
            >
              {userInfo && userInfo.isAdmin && (
                <>
                  <li>
                    <NavLink
                      style={({ isActive }) => {
                        if (isActive)
                          return { fontWeight: "500", background: "#353434" };
                      }}
                      className="link"
                      to="/admin/dashboard"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      style={({ isActive }) => {
                        if (isActive)
                          return { fontWeight: "500", background: "#353434" };
                      }}
                      className="link"
                      to="/admin/products"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      style={({ isActive }) => {
                        if (isActive)
                          return { fontWeight: "500", background: "#353434" };
                      }}
                      className="link"
                      to="/admin/category"
                    >
                      Category
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      style={({ isActive }) => {
                        if (isActive)
                          return { fontWeight: "500", background: "#353434" };
                      }}
                      className="link"
                      to="/admin/orderList"
                    >
                      Orders
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      style={({ isActive }) => {
                        if (isActive)
                          return { fontWeight: "500", background: "#353434" };
                      }}
                      className="link"
                      to="/admin/users"
                    >
                      Users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      style={({ isActive }) => {
                        if (isActive)
                          return { fontWeight: "500", background: "#353434" };
                      }}
                      className="link"
                      to="/profile"
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li onClick={logoutHandler}>
                    <button>Logout</button>
                  </li>
                </>
              )}

              {userInfo && !userInfo.isAdmin && (
                <>
                  <li>
                    <Link className="link" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={logoutHandler}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          )}

          <div className="nav-link cursor-pointer" onClick={toggleDropDown}>
            <CiUser className="nav-link-icon" />
            <span className="nav-link-name">{lastName(userInfo.username)}</span>
          </div>
        </div>
      )}

      {!userInfo && (
        <div className="navigate-menu action">
          <NavLink
            to="/login"
            className="nav-link bg-pink-500 py-2 px-4 rounded-full md:bg-transparent md:p-0 md:rounded-none"
          >
            <AiOutlineLogin className="nav-link-icon" />
            <span className="nav-link-name">Login</span>
          </NavLink>

          <NavLink to="/register" className="nav-link hidden md:flex">
            <CiUser className="nav-link-icon" />
            <span className="nav-link-name">Signup</span>
          </NavLink>
        </div>
      )}

      {userInfo && smMenuShow && (
        <div>
          <ul
            className={`fixed h-screen top-0 transition-all  ${
              smMenuShow ? "left-0" : "left-[-100%]"
            } w-[60%] bg-pink-500 text-center py-5`}
          >
            {userInfo && userInfo.isAdmin && (
              <>
                <li>
                  <NavLink
                    style={({ isActive }) => {
                      if (isActive)
                        return {
                          fontWeight: "500",
                          background: "#f472b6",
                          borderLeft: "2px solid white",
                        };
                    }}
                    className="link w-full block hover:bg-pink-400 hover:transition-colors py-2"
                    to="/admin/dashboard"
                  >
                    Dashboard
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    style={({ isActive }) => {
                      if (isActive)
                        return {
                          fontWeight: "500",
                          background: "#f472b6",
                          borderLeft: "2px solid white",
                        };
                    }}
                    className="link w-full block hover:bg-pink-400 hover:transition-colors py-2"
                    to="/admin/products"
                  >
                    Product List
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    style={({ isActive }) => {
                      if (isActive)
                        return {
                          fontWeight: "500",
                          background: "#f472b6",
                          borderLeft: "2px solid white",
                        };
                    }}
                    className="link w-full block hover:bg-pink-400 hover:transition-colors py-2"
                    to="/admin/product-create"
                  >
                    Create Product
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    style={({ isActive }) => {
                      if (isActive)
                        return {
                          fontWeight: "500",
                          background: "#f472b6",
                          borderLeft: "2px solid white",
                        };
                    }}
                    className="link w-full block hover:bg-pink-400 hover:transition-colors py-2"
                    to="/admin/category"
                  >
                    Category
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    style={({ isActive }) => {
                      if (isActive)
                        return {
                          fontWeight: "500",
                          background: "#f472b6",
                          borderLeft: "2px solid white",
                        };
                    }}
                    className="link w-full block hover:bg-pink-400 hover:transition-colors py-2"
                    to="/admin/orderList"
                  >
                    Orders
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    style={({ isActive }) => {
                      if (isActive)
                        return {
                          fontWeight: "500",
                          background: "#f472b6",
                          borderLeft: "2px solid white",
                        };
                    }}
                    className="link w-full block hover:bg-pink-400 hover:transition-colors py-2"
                    to="/admin/users"
                  >
                    Users
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    style={({ isActive }) => {
                      if (isActive)
                        return {
                          fontWeight: "500",
                          background: "#f472b6",
                          borderLeft: "2px solid white",
                        };
                    }}
                    className="link w-full block hover:bg-pink-400 hover:transition-colors py-2"
                    to="/profile"
                  >
                    Profile
                  </NavLink>
                </li>

                <li onClick={logoutHandler}>
                  <button className="link w-full block hover:bg-pink-400 hover:transition-colors py-2">
                    Logout
                  </button>
                </li>
                
              </>
            )}

            {userInfo && !userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    className="link w-full block hover:bg-pink-400 hover:transition-colors py-2"
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    className="link w-full block hover:bg-pink-400 hover:transition-colors py-2"
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      {userInfo && (
        <div
          className=" md:hidden text-xl cursor-pointer text-white"
          onClick={toggleSmMenuShow}
        >
          {smMenuShow ? <RxCross2 /> : <IoMdMenu />}
        </div>
      )}
    </div>
  );
};

export default Navigation;
