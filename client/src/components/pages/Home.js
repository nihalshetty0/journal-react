import React from "react";
import Navbar from "../layout/Navbar";
import Body from "../layout/Body";
import Journals from "../journal/Journals";
import AddJournal from "../journal/AddJournal";
import EditJournal from "../journal/EditJournal";

const Home = () => {
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
