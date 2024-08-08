import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
const AdminMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => [setMenuOpen(!isMenuOpen)];

  return (
    <div className="hidden md:flex justify-end items-center w-full my-5">
      <div className="fixed top-10 right-10 z-[100]">
        <div>
          {isMenuOpen ? (
            <RxCross2
              onClick={toggleMenu}
              className="w-[30px] cursor-pointer text-white text-2xl"
            />
          ) : (
            <IoMdMenu
              onClick={toggleMenu}
              className="bg-[#151515] rounded-sm w-[30px] cursor-pointer text-white text-2xl"
            />
          )}
        </div>

        {isMenuOpen && (
          <ul className="absolute top-[30px] text-white right-0 w-max bg-[#151515] px-2 py-2 rounded-md ">
            <li>
              <NavLink
                className="block text-sm  w-full rounded-md text-left px-3 py-2 hover:bg-[#101011]"
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Admin Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block text-sm  w-full rounded-md text-left px-3 py-2 hover:bg-[#101011]"
                to="/admin/category"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Create Category
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block text-sm  w-full rounded-md text-left px-3 py-2 hover:bg-[#101011]"
                to="/admin/product-create"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Create Product
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block text-sm  w-full rounded-md text-left px-3 py-2 hover:bg-[#101011]"
                to="/admin/products"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block text-sm  w-full rounded-md text-left px-3 py-2 hover:bg-[#101011]"
                to="/admin/users"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Manage User
              </NavLink>
            </li>
            <li>
              <NavLink
                className="block text-sm  w-full rounded-md text-left px-3 py-2 hover:bg-[#101011]"
                to="/admin/orderList"
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
                Manage Orders
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminMenu;
