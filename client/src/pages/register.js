import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/authActions";

const Register = ({history}) => {
  const [info, setInfo] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.isAuth) {

      history.push("/feed");
    }
  }, [auth.isAuth])
  const handleChange = (el) => {

    setInfo({ ...info, [el.target.name]: el.target.value });
  };

  const registerNow = el => {
      el.preventDefault();
      dispatch(registerUser(info));
  };


  return (
    <form onSubmit= {registerNow} >
      <div>
        <label>FirstName</label>
        <input type="text" name="firstname" onChange={handleChange} />
      </div>
      <div>
        <label>LastName</label>
        <input type="text" name="lastname" onChange={handleChange} />
      </div>
      <div>
        <label>Phone</label>
        <input type="text" name="phone" onChange={handleChange} />
      </div>
      <div>
        <label>Email</label>
        <input type="text" name="email" onChange={handleChange} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" onChange={handleChange} />
      </div>
      <button type="submit" onClick={()=> dispatch(registerUser(info))}>Register</button>
    </form>
  );
};

export default Register;
