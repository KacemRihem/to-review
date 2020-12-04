import React, { useState } from 'react';

const Login = ()=>{
    const [info, setInfo] = useState({
        email:"",
        password:"",
       });
       const handleChange = el =>{
           setInfo({...info, [el.target.name]: el.target.value})
       }
    return(
        <form>
            <div>
                <label>Email</label>
                <input type="text" name="email" onChange={handleChange} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" onChange={handleChange} />
            </div>
            <button type="submit" >Login</button>

        </form>
    )
};

export default Login;