import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../../redux//features/auth/authSlice.js";
import { useSignupMutation } from "../../redux/api/userApiSlice.js";
import { addAction } from "../../redux/features/notice/naticSlice.js";
import { ERROR, SUCCESS } from "../../redux/constants.js";
import Loader from "../../components/Loader.jsx";
import Button from "./../../components/Button";

const Signup = () => {
  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handlerChange = (e) => {
    setFormValue((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const userInfo = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useSignupMutation();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);

  const redirect = sp.get("redirect") || "/";

  const error = (value) => {
    dispatch(addAction({ variant: ERROR, value }));
  };
  const success = (value) => {
    dispatch(addAction({ variant: SUCCESS, value }));
  };
  const handlerSubmit = async (e) => {
    e.preventDefault();

    if (!formValue.username) {
      return error("Username is required");
    }
    if (!formValue.email) {
      return error("Email address is required");
    }
    if (!formValue.password) {
      return error("Password is required");
    }

    if (formValue.password !== formValue.confirmPassword) {
      return error("Confirm password didn't match");
    }

    try {
      const res = await login({ ...formValue }).unwrap();
      success("Account created successfully");
      dispatch(setCredentials(res));
    } catch (err) {
      error(err.data.message);
    }
  };

  useEffect(() => {
    if (userInfo) {
      console.log("okk..");
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  return (
    <div className="form-container signup w-[320px] md:w-[450px] mx-auto">
      <div className="form-title">
        <h2 className="">Sign Up</h2>
      </div>
      <form className="form" onSubmit={handlerSubmit}>
        <div className="form-input">
          <label htmlFor="username">User name</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formValue.username}
            onChange={handlerChange}
          />
        </div>

        <div className="form-input">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValue.email}
            onChange={handlerChange}
          />
        </div>

        <div className="form-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formValue.password}
            onChange={handlerChange}
          />
        </div>

        <div className="form-input">
          <label htmlFor="confirmPassword">Confirem password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formValue.confirmPassword}
            onChange={handlerChange}
          />
        </div>
        <Button type="submit" isLoading={isLoading}>
          Singnup
        </Button>
      </form>

      <span className="option">
        New account ?{" "}
        <Link
          className="text-pink-500 hover:underline"
          to={redirect ? `/login?redirect=${redirect}` : "/login"}
        >
          Login
        </Link>
      </span>
    </div>
  );
};

export default Signup;
