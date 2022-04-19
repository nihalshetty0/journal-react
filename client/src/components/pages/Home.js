import React, { useContext, useEffect } from "react";

import Navbar from "../layout/Navbar";
import Body from "../layout/Body";
import Journals from "../journal/Journals";
import AddJournal from "../journal/AddJournal";
import EditJournal from "../journal/EditJournal";

import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  // if (!authContext.isAuthenticated) return <Navigate to='/login' />;
  return (
    <>
      <Navbar />
      <Body>
        <Journals />
        <AddJournal />
        <EditJournal />
      </Body>
    </>
  );
};

export default Home;
