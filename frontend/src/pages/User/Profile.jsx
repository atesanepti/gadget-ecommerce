import React, { useEffect, useState } from "react";
import { addAction } from "../../redux/features/notice/naticSlice.js";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useProfileMutation,
  useLogoutMutation,
} from "../../redux/api/userApiSlice.js";
import Loader from "./../../components/Loader.jsx";
import { setCredentials, logout } from "../../redux/features/auth/authSlice.js";
import { ERROR, SUCCESS } from "../../redux/constants.js";
import Button from './../../components/Button';

const Profile = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();
  const [profileUpdateApiCall, { isLoading }] = useProfileMutation();
  const navigate = useNavigate();

  const [formValue, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      username: userInfo.username,
      email: userInfo.email,
    }));
  }, [userInfo]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const error = (value) => {
    dispatch(addAction({ variant: ERROR, value }));
  };

  const success = (value) => {
    dispatch(addAction({ variant: SUCCESS, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValue.password) {
      if (
        userInfo.username === formValue.username ||
        userInfo.email == formValue.email
      ) {
        return;
      }
    }

    if (formValue.confirmPassword !== formValue.password) {
      return error("Confirm password didn't match");
    }

    try {
      const res = await profileUpdateApiCall(formValue).unwrap();
      success("User updated successfully");
      if (formValue.password && formValue.confirmPassword) {
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate("/login");
        return;
      }

      dispatch(setCredentials(res));
    } catch (err) {
      error(err.data.message)
    }
  };

  return (
    <div className="profile-container max-h-[70vh]">
      <div className="w-[90%] md:w-2/4 lg:w-1/3 ">
        <h3 className="text-white text-center text-2xl mg:text-2xl lg:text-3xl font-medium lg:font-semibold my-3 lg:my-6">
          Profile
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <label htmlFor="username">User name</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formValue.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValue.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-input">
            <label htmlFor="password">Passaword</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formValue.passoword}
              onChange={handleChange}
            />
          </div>

          <div className="form-input">
            <label htmlFor="confirmPassword">Confirm passaword</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formValue.confirmPassword}
              onChange={handleChange}
            />
          </div>
          {isLoading && <Loader />}
          <div className="profile-action">
            {userInfo.isAdmin ? (
              <Link to="/admin/products" className="link">
                See Producs
              </Link>
            ) : (
              <Link to="/userOrder" className="link">
                My Orders
              </Link>
            )}
            <Button type="submit" isLoading={isLoading} style="w-[8rem]">
              Update Data
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
