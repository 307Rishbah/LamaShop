import "./register.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/authAction";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformpassword] = useState("");

  const { isLoading, isError, isSuccess } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (isSuccess) navigate("/login");
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== conformPassword) {
      alert("Password did not match");
    } else {
      dispatch(registerUser({ username, email, password }));
    }
  };

  return (
    <div className="registerContainer">
      <div className="wrapperContainer">
        <h1 className="registerTitle">CREATE AN ACCOUNT</h1>
        <form action="" className="registerForm" onSubmit={handleSubmit}>
          {isError && <>Error...</>}
          <input
            type="text"
            name=""
            id=""
            required
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            className="registerInput"
          />
          <input
            type="email"
            name=""
            id=""
            required
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="registerInput"
          />
          <input
            type="password"
            name=""
            id=""
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="registerInput"
          />
          <input
            type="password"
            name=""
            id=""
            required
            placeholder="Conform Password"
            onChange={(e) => setConformpassword(e.target.value)}
            className="registerInput"
          />
          <span className="registerAggrement">
            By creating an account , I consent to the processing of my control
            data in accordance with the PRIVATE POLICY
          </span>
          <button className="registerButton" type="submit" disabled={isLoading}>
            {isLoading ? <>loading..</> : "CREATE"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
