import React, { useContext } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";

import JournalContext from "../../context/journal/journalContext";

const JournalItem = ({ journal }) => {
  const journalContext = useContext(JournalContext);
  const { deleteJournal, setCurrent } = journalContext;

  const onDelete = () => {
    deleteJournal(journal._id);
  };

  const onClick = () => {
    setCurrent(journal);
  };
  return (
    <>
      <div className='flex items-center'>
        <div
          onClick={onClick}
          className='grow z-10 bg-secondary hover:bg-[#eee] p-5 my-3 rounded-sm cursor-pointer flex justify-between items-end transition-all duration-200 ease-in-out'
        >
          <h1 className='capitalize text-xl font-semibold'>{journal.title}</h1>
          <div className='flex items-end'>
            <AiTwotoneEdit className='text-xl mr-2' />
            <h3 className='text-gray-700 text-xs'>
              <Moment format='Do MMMM YYYY'>{journal.date}</Moment>
            </h3>
          </div>
        </div>
        <div className='p-2 cursor-pointer hover:pl-10 transition-all duration-200 ease-in-out'>
          <div className='relative'>
            <BsThreeDotsVertical />
            <button
              className='absolute -left-8 top-0 text-red-600 text-lg cursor-pointer '
              onClick={onDelete}
            >
              <AiTwotoneDelete />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

JournalItem.propTypes = {
  journal: PropTypes.object.isRequired,
};

export default JournalItem;
