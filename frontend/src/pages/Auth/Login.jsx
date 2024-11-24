import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../../redux//features/auth/authSlice.js";
import { useLoginMutation } from "../../redux/api/userApiSlice.js";
import { addAction } from "../../redux/features/notice/naticSlice.js";
import Loader from "../../components/Loader.jsx";
import Button from "./../../components/Button";
import { ERROR, SUCCESS } from "../../redux/constants.js";

const Login = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
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
  const [login, { isLoading }] = useLoginMutation();
  const { search } = useLocation();
  // const notice = useSelector((state) => state.notice);
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

    if (!formValue.email) {
      error("Please Enter email address");
      return;
    } else if (!formValue.password) {
      error("Please Enter password");
      return;
    }

    try {
      const res = await login({ ...formValue }).unwrap();
      success("Login Successfull");
      dispatch(setCredentials(res));
    } catch (err) {
      error(err.data.message);
      return;
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const handleDemoLogin = (type) => {
    if (type == "admin") {
      setFormValue({ email: "epti060@gmail.com", password: "Epti1234" });
    } else {
      setFormValue({ email: "demoofaliba@gmail.com", password: "Aliba1234" });
    }
  };

  return (
    <div className="form-container w-[320px] md:w-[450px] mx-auto">
      <div className="form-title">
        <h2 className="">Sign In</h2>
      </div>
      <form className="form" onSubmit={handlerSubmit}>
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
        <div className="flex items-center gap-2 my-3 ">
          <button
            onClick={() => handleDemoLogin("admin")}
            className="!bg-white font-medium font-xs !text-black"
          >
            Demo Login as Admin
          </button>
          <button
            onClick={() => handleDemoLogin("user")}
            className="!bg-white font-medium font-xs !text-black"
          >
            Demo Login as User
          </button>
        </div>
        <Button isLoading={isLoading}>Login</Button>
      </form>

      <span className="option">
        New account ?{" "}
        <Link
          className="text-pink-500 hover:underline"
          to={redirect ? `/register?redirect=${redirect}` : "/register"}
        >
          Register
        </Link>
      </span>
    </div>
  );
};

export default Login;
