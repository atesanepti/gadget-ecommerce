import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineShop, AiOutlineLogin } from "react-icons/ai";
import { CiUser, CiShoppingCart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import "./style.css";

const Navigation = () => {
  const [showNav, setShowNav] = useState(false);

  const toggleShowNav = () => {
    setShowNav(!showNav);
  };

  return (
    <div id="navigation-container" className={`${showNav ? "hidden" : "flex"}`}>
      <div>
        <Link to="/" className="nav-link">
          <AiOutlineHome className="nav-link-icon"  />
          <span className="nav-link-name">Home</span>
        </Link>

        <Link to="/" className="nav-link">
          <AiOutlineShop className="nav-link-icon" />
          <span className="nav-link-name">Shop</span>
        </Link>

        <Link to="/" className="nav-link">
          <CiShoppingCart className="nav-link-icon"  />
          <span className="nav-link-name">Cart</span>
        </Link>

        <Link to="/" className="nav-link">
          <FaHeart className="nav-link-icon"  />
          <span className="nav-link-name">Favorit</span>
        </Link>
      </div>

      <div>
        <Link to="/login" className="nav-link">
          <AiOutlineLogin className="nav-link-icon"  />
          <span className="nav-link-name">Login</span>
        </Link>

        <Link to="/login" className="nav-link">
          <CiUser className="nav-link-icon"  />
          <span className="nav-link-name">Signup</span>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
