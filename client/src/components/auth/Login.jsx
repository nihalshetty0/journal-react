import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

import Navbar from "../layout/Navbar";
import Body from "../layout/Body";
import Spinner from "../layout/Spinner";

import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const {
    login,
    error,
    clearErrors,
    isAuthenticated,
    loadUser,
    loading,
    setLoadingFalse,
  } = authContext;
  const { setAlert } = alertContext;

  // let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    } else {
      setLoadingFalse();
    }
    if (error === "Invalid credentials") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Please fill in all fields", "danger");
    } else {
      login({
        email,
        password,
      });
    }
  };

  const fillDefaultUser = () => {
    setUser({
      email: "johndoe@journal.com",
      password: "YxiS9qPnZfj4urF",
    });
  };

  if (localStorage.token) return <Navigate to='/' />;

  return (
    <>
      <Navbar />
      <Body>
        <div className='flex items-center justify-center min-h-[100vh]'>
          <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
            <div className='bg-white px-6 py-8 rounded shadow-md border border-gray-200 text-black w-full'>
              <form
                onSubmit={onSubmit}
                className='flex flex-col justify-center'
              >
                <h1 className='mb-8 text-3xl text-center font-bold'>
                  Login in
                </h1>

                <input
                  type='text'
                  className='block border border-grey-light w-full p-3 rounded mb-4'
                  name='email'
                  placeholder='Email'
                  onChange={onChange}
                  required
                  value={user.email}
                />

                <input
                  type='password'
                  className='block border border-grey-light w-full p-3 rounded mb-4'
                  name='password'
                  placeholder='Password'
                  onChange={onChange}
                  required
                  value={user.password}
                />

                <button
                  type='submit'
                  className='flex justify-center w-full text-center py-3 rounded bg-green text-white bg-primary hover:text-gray-400 focus:outline-none my-1'
                >
                  <span className='relative'>
                    Log in
                    {loading && <Spinner mode={"btn"} />}
                  </span>
                </button>
                <button
                  className='mt-2 text-xs bg-gray-800 rounded-sm text-white mx-auto p-1 w-[120px] animate-bounce'
                  onClick={fillDefaultUser}
                >
                  Get demo account
                </button>
              </form>
            </div>

            <div className='text-grey-dark'>
              Don't have an account
              <Link
                className='no-underline border-b border-blue text-blue'
                to='/signup'
              >
                ? Sign up
              </Link>
            </div>
          </div>
        </div>
        {/* </div> */}
      </Body>
    </>
  );
};

export default Login;
