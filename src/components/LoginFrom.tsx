import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
//import bcrypt from 'bcryptjs'

import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import { loginUser, authUser } from "../redux/reducers/userReducer";

function LoginForm(props: any) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);
  const [message, setMassage] = useState(false);
  const {
    authRedu: { userAuth: auth, userToken: accessToken },
  } = useSelector((state: RootState) => state);
  const login = async (e: any) => {
    e.preventDefault();
    const noAuthUser = password == "" || email == "";
    if (!noAuthUser) {
      //const hashedPassword = bcrypt.hashSync(password, process.env.SECRECT_KEY)
      const result = await dispatch(
        loginUser({
          email: email,
          password: password,
        })
      );
      props.setLoading(true);
      setTimeout(function () {
        props.setLoading(false);
        if (result.payload) {
          dispatch(authUser(result.payload.access_token));
          navigate(`/`);
        } else {
          setMassage(true);
        }
      }, 4000);
    }
  };

  return (
    <>
      <h2 className="title">Login</h2>
      <form className="loginform">
        <label>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label> Password</label>
        <input
          type="password"
          placeholder="*******"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <>
          {message && (
            <span className="error-message">
              {"Please, check your user name and password"}
            </span>
          )}
        </>
        <input type="submit" onClick={login} value="Login" />
      </form>
    </>
  );
}

export default LoginForm;
