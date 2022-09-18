import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "../redux/store";

const Profile = () => {
  const user = useSelector((state: RootState) => state.authRedu.userAuth);
  const navigate = useNavigate();

  return (
    <div aria-describedby="Profile page">
      {user && (
        <div className="profile">
          <h1>Hello {user.name}</h1>
          <img src={user.avatar} alt="User Pic" />
          <p> You are a {user.role}</p>
          <p> Email: {user.email}</p>
          <button
            onClick={() => {
              navigate("/edit");
            }}
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
