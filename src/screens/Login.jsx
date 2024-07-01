import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [credenditials, setCredenditials] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleOnchange = (e) => {
    setCredenditials({ ...credenditials, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credenditials.email,
        password: credenditials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentials");
    }
    if (json.success) {
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credenditials.email}
              onChange={handleOnchange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credenditials.password}
              onChange={handleOnchange}
            />
          </div>

          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/createUser" className="m-3 btn btn-danger">
            I'm a new user
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
