import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";

import LoginForm from "../components/LoginFrom";
import RegisterForm from "../components/RegisterFrom";

const Login = () => {
  const [form, setForm] = useState("Login");
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <div className="loading">
            <Button
              className="text-center align-middle"
              variant="dark"
              disabled
            >
              <Spinner
                as="span"
                variant="light"
                size="sm"
                role="status"
                aria-hidden="true"
                animation="border"
              />
              Loading...
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="form-container"
          aria-describedby="Login and regisration page"
        >
          <div className="form">
            <div>
              {form === "Login" ? (
                <LoginForm setLoading={setLoading} />
              ) : (
                <RegisterForm formswitch={setForm} setLoading={setLoading} />
              )}
            </div>
            <div className="btnswitch">
              <input
                type="button"
                className={form === "Login" ? "active-form" : ""}
                onClick={(e) => {
                  setForm("Login");
                }}
                value="Already Have a account?"
              />
              <input
                type="button"
                className={form === "Login" ? "" : "active-form"}
                onClick={() => {
                  setForm("Register");
                }}
                value="Register new account"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
