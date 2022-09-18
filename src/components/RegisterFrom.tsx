import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Spinner } from "react-bootstrap";

import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import { registerUser } from "../redux/reducers/userReducer";

function RegisterForm(props: any) {
  const [loading, setLoding] = useState(false);
  const [register, setregister] = useState(false);
  const [name, setName] = useState(String);
  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);
  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.authRedu);

  useEffect(() => {
    const noAuthUser = name == "" || password == "" || email == "";
    if (!noAuthUser) {
      props.setLoading(true);
      dispatch(
        registerUser({
          name: name,
          email: email,
          password: password,
          avatar: "https://api.lorem.space/image/face?w=640&h=480",
        })
      );
      setTimeout(function () {
        if (auth.userAuth) {
          props.formswitch("Login");
        }
        props.setLoading(false);
      }, 4000);
    }
  }, [register]);

  return (
    <>
      <h2 className="title">Registration</h2>
      <form className="Registrationfrom">
        <label>User Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your name.."
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email.."
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
        <input
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            setregister(register ? false : true);
          }}
          value="Register"
        />
      </form>
    </>
  );
}

export default RegisterForm;
