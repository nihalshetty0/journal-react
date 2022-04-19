import React, { useState, useContext } from "react";
import JournalContext from "../../context/journal/journalContext";
import moment from "moment";

import JournalForm from "./JournalForm";

const AddJournal = () => {
  const journalContext = useContext(JournalContext);
  const [text, setText] = useState("");
  const [title, setTitle] = useState(moment().format("MMM Do YY"));
  const [showForm, setShowForm] = useState(false);

  const onClick = () => {
    setShowForm(true);
  };
  const onSubmit = () => {
    journalContext.addJournal({ title, text });
  };

  return (
    <>
      <div
        className={`z-20 fixed mx-auto bottom-6 right-10 p-2 flex justify-end max-w-3xl ${
          showForm &&
          "h-[75vh] bg-white bottom-3 left-10 border border-gray-300 "
        }`}
      >
        {!showForm && (
          <button
            onClick={onClick}
            className='bg-primary px-3 py-2 right-0 text-base text-gray-300 font-semibold mr-6 m-0'
          >
            Add
          </button>
        )}

        <JournalForm
          showForm={showForm}
          title={title}
          setTitle={setTitle}
          setShowForm={setShowForm}
          setText={setText}
          text={text}
          onSubmit={onSubmit}
          clearCurrent={journalContext.clearCurrent}
          edit={false}
        />
      </div>
      {showForm && (
        <div className='absolute z-10 top-0 -bottom-20 bg-black opacity-80'></div>
      )}
    </>
  );
};

export default AddJournal;
