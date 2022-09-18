import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../redux/store";
import { useAppDispatch } from "../redux/hooks";
import { editProfile, registerUser } from "../redux/reducers/userReducer";
import { FileUpload } from "./FileUpload";

function RegisterForm(props: any) {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("https://api.lorem.space/image/face?w=640&h=480");
  const [role, setRole] = useState("");
  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.authRedu.userAuth);
  const profileEditValidation =
    name != undefined && password != undefined && email != undefined;
  const editProfileData = {
    id: id,
    email: email,
    password: password,
    name: name,
    role: role,
    avatar: image,
  };
  if (auth && editProfileData.id == 0) {
    setId(auth?.id);
    setName(auth?.name);
    setEmail(auth?.email);
    setPassword(auth?.password);
    setImage(auth?.avatar);
    setRole(auth?.role);
  }

  const updateProfile = () => {
    if (profileEditValidation) {
      dispatch(
        editProfile(editProfileData)
      );
    }
  };

  return (
    <div  className="form-container">
      <h2 className="title">Profile Update</h2>
      <form className="Registrationfrom">
        <label>Name</label>
        <input
          type="text"
          placeholder="Your name.."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Your email.."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label> Password</label>
        <input
          type="password"
          placeholder="*******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label> User Type</label>
       {auth?.role ==="admin" && <select
          name="selectCategory"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
        </select>}
        <label> Profile Image</label>
        <FileUpload handleFile={setImage} />
        <input
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            updateProfile();
          }}
          value="Submit"
        />
      </form>
    </div>
  );
}

export default RegisterForm;
