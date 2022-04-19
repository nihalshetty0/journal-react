import React, { useState, useContext, useEffect } from "react";
import JournalContext from "../../context/journal/journalContext";

import JournalForm from "./JournalForm";

const EditJournal = () => {
  const journalContext = useContext(JournalContext);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [showForm, setShowForm] = useState(false);

  const { updateJournal, clearCurrent, current } = journalContext;
  const onSubmit = () => {
    updateJournal({ _id: current._id, title, text, date: Date.now() });
    clearCurrent();
  };

  useEffect(() => {
    if (current !== null && current !== undefined) {
      const { title, text } = current;
      setTitle(title);
      setText(text);
      setShowForm(true);
    }
  }, [current]);

  return (
    <>
      <div
        className={`z-20 fixed mx-auto bottom-3 right-10 p-2 flex justify-end max-w-3xl   ${
          showForm &&
          "h-[75vh] bg-white bottom-3 left-10 border border-gray-300 "
        }`}
      >
        <JournalForm
          showForm={showForm}
          title={title}
          setTitle={setTitle}
          setShowForm={setShowForm}
          setText={setText}
          text={text}
          onSubmit={onSubmit}
          clearCurrent={clearCurrent}
          edit={true}
        />
      </div>
      {showForm && (
        <div className='absolute z-10 top-0 -bottom-20 bg-black opacity-80'></div>
      )}
    </>
  );
};

export default EditJournal;
