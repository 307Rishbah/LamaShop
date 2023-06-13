import "./login.css";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authAction";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const username = useRef();
  const password = useRef();
  const { isLoading, userInfo, isError } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //redirect authenticated user to homepage
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      loginUser({
        username: username.current.value,
        password: password.current.value,
      })
    );
  };
  return (
    <div className="loginContainer">
      <div className="loginWrapper">
        <h1 className="loginTitle">SIGN IN</h1>
        <form action="" className="loginForm" onSubmit={handleSubmit}>
          <input
            type="text"
            name=""
            id=""
            ref={username}
            className="loginInput"
            placeholder="Username"
          />
          <input
            type="password"
            name=""
            id=""
            ref={password}
            className="loginInput"
            placeholder="Password"
          />
          <button className="loginButton" type="submit" disabled={isLoading}>
            {isLoading ? <>loading...</> : "LOGIN"}
          </button>
          {isError && <>Something went wrong... style={{ color: "red" }} </>}
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link to={"/register"}>CREATE A NEW ACCOUN</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
