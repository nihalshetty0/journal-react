import React, { useContext, useEffect } from "react";
import JournalItem from "./JournalItem";
import Spinner from "../layout/Spinner";

import JournalContext from "../../context/journal/journalContext";
import AuthContext from "../../context/auth/authContext";

const Journals = () => {
  const journalContext = useContext(JournalContext);
  const authContext = useContext(AuthContext);
  const { journals, getJournals, loading } = journalContext;
  const { user } = authContext;
  useEffect(() => {
    getJournals();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {journals === null || loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className='font-bold text-3xl text-gray-800 py-4'>
            👋, {user?.name}
          </h1>
          {journals.length === 0 ? (
            <h1 className='text-center font-semibold text-lg'>
              Start Journalling
            </h1>
          ) : (
            journals.map((journal) => {
              return <JournalItem journal={journal} key={journal._id} />;
            })
          )}
        </>
      )}
    </>
  );
};

export default Journals;
