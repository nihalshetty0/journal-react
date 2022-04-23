import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import AuthContext from "../../context/auth/authContext";
import JournalContext from "../../context/journal/journalContext";

import Alert from "./Alert";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const journalContext = useContext(JournalContext);

  const { isAuthenticated, logout, loading } = authContext;
  const { clearJournals } = journalContext;
  const onLogout = () => {
    logout();
    clearJournals();
  };

  const authLinks = (
    <>
      <div
        onClick={onLogout}
        href='#!'
        className='flex items-stretch cursor-pointer'
      >
        <FiLogOut className='mr-2 mt-1' />
        {/* <span className='hide-sm'></span> */}
        Logout
      </div>
    </>
  );

  const guestLinks = (
    <>
      <div>
        <Link to='/signup'>Sign up</Link>
      </div>
      <div>
        <Link to='/login'>Login</Link>
      </div>
    </>
  );
  return (
    <div className='navbar z-20'>
      <div className='container flex justify-between items-center max-w-5xl'>
        <div className='text-2xl'>journal</div>
        {!loading && (
          <div className='list'>{isAuthenticated ? authLinks : guestLinks}</div>
        )}
      </div>
      <div className='absolute top-20'>
        <Alert />
      </div>
    </div>
  );
};

export default Navbar;
