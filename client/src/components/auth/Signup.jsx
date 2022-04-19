import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

import Navbar from "../layout/Navbar";
import Body from "../layout/Body";

import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Signup = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { register, error, clearErrors, isAuthenticated } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    // if (isAuthenticated) {
    //   props.history.push("/");
    // }
    if (error === "User already exists") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "")
      setAlert("Please enter all fields", "danger");
    else if (password !== password2) setAlert("Password don't match", "danger");
    else
      register({
        name,
        email,
        password,
      });
  };
  if (isAuthenticated) return <Navigate to='/' />;
  return (
    <>
      <Navbar />
      <Body>
        <div className='flex items-center justify-center min-h-[90vh]'>
          <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
            <div className='bg-white px-6 py-8 rounded shadow-md border border-gray-200 text-black w-full'>
              <form onSubmit={onSubmit}>
                <h1 className='mb-8 text-3xl text-center font-bold'>Sign up</h1>
                <input
                  type='text'
                  className='block border border-grey-light w-full p-3 rounded mb-4'
                  name='name'
                  placeholder='Full Name'
                  onChange={onChange}
                  required
                />

                <input
                  type='text'
                  className='block border border-grey-light w-full p-3 rounded mb-4'
                  name='email'
                  placeholder='Email'
                  onChange={onChange}
                  required
                />

                <input
                  type='password'
                  className='block border border-grey-light w-full p-3 rounded mb-4'
                  name='password'
                  placeholder='Password'
                  onChange={onChange}
                  required
                  minLength={6}
                />
                <input
                  type='password'
                  className='block border border-grey-light w-full p-3 rounded mb-4'
                  name='password2'
                  onChange={onChange}
                  placeholder='Confirm Password'
                  required
                  minLength={6}
                />

                <button
                  type='submit'
                  className='w-full text-center py-3 rounded bg-green text-white bg-primary hover:text-gray-400 focus:outline-none my-1'
                >
                  Create Account
                </button>
              </form>
            </div>

            <div className='text-grey-dark mt-6'>
              Already have an account
              <Link
                className='no-underline border-b border-blue text-blue'
                to='/login'
              >
                ? Log in
              </Link>
            </div>
          </div>
        </div>
        {/* </div> */}
      </Body>
    </>
  );
};

export default Signup;
