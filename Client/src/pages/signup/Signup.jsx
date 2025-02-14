import React, { useState } from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const {loading, signup} = useSignup();

  const handleCheckboxChange = (gender) =>{
    setInputs({...inputs,gender})
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log("Form Inputs:", inputs); 
    await signup(inputs.fullName, inputs.username, inputs.password, inputs.confirmPassword, inputs.gender);

  }


  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop:filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-400">
          Sign up
          <span className="text-blue-500">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Rama Basumatary"
              className="input input-bordered w-full h-10"
              value={inputs.fullName}
              onChange={(e)=>setInputs({...inputs, fullName: e.target.value})}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="ramabasumatary"
              className="input input-bordered w-full h-10"
              value={inputs.username}
              onChange={(e)=>setInputs({...inputs, username:e.target.value})}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="input input-bordered w-full h-10"
              value={inputs.password}
              onChange={(e)=>setInputs({...inputs, password:e.target.value})}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="ConfirmPassword"
              className="input input-bordered w-full h-10"
              value={inputs.confirmPassword}
              onChange={(e)=>setInputs({...inputs, confirmPassword:e.target.value})}
            />
          </div>

          {/* GENDER CHECKBOX GOES HERE */}
          <GenderCheckbox handleCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an account?
          </Link>

          <div>
          <button type="submit" className="btn btn-block btn-sm mt-2" disabled={loading}>
          {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
