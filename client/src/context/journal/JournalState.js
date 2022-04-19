import React, { useReducer } from "react";
import JournalContext from "./journalContext";
import journalReducer from "./journalReducer";

import axios from "axios";

// import { v4 as uuidv4 } from "uuid";

import {
  GET_JOURNALS,
  ADD_JOURNAL,
  DELETE_JOURNAL,
  SET_CURRENT,
  // CLEAR_CURRENT,
  UPDATE_JOURNAL,
  // FILTER_JOURNAL,
  CLEAR_JOURNAL,
  JOURNAL_ERROR,
} from "../types";

const JournalState = (props) => {
  const initialState = {
    journals: null,
    current: null,
  };

  const [state, dispatch] = useReducer(journalReducer, initialState);

  const getJournals = async () => {
    try {
      const res = await axios.get("/api/journals");
      dispatch({
        type: GET_JOURNALS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({ type: JOURNAL_ERROR, payload: error });
    }
  };
  // ADD JOURNAL
  const addJournal = async (journal) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/journals", journal, config);
      dispatch({
        type: ADD_JOURNAL,
        payload: res.data,
      });
    } catch (error) {
      dispatch({ type: JOURNAL_ERROR, payload: error.response.msg });
    }
  };

  // DELETE JOURNAL
  const deleteJournal = async (id) => {
    try {
      await axios.delete(`/api/journals/${id}`);
      dispatch({
        type: DELETE_JOURNAL,
        payload: id,
      });
    } catch (error) {
      dispatch({ type: JOURNAL_ERROR, payload: error.response.msg });
    }
  };

  // SET CURRENT JOURNAL
  const setCurrent = (journal) => {
    dispatch({ type: SET_CURRENT, payload: journal });
  };

  // CLEAR CURRENT JOURNAL
  const clearCurrent = () => {
    dispatch({ type: SET_CURRENT });
  };
  // UPDATE JOURNAL

  const updateJournal = async (journal) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `/api/journals/${journal._id}`,
        journal,
        config
      );
      dispatch({ type: UPDATE_JOURNAL, payload: res.data });
    } catch (error) {
      dispatch({ type: JOURNAL_ERROR, payload: error.response.msg });
    }
  };

  // FILTER JOURNAL

  // CLEAR JOURNAL
  const clearJournals = () => {
    dispatch({ type: CLEAR_JOURNAL });
  };

  return (
    <JournalContext.Provider
      value={{
        journals: state.journals,
        current: state.current,
        error: state.error,
        getJournals,
        addJournal,
        deleteJournal,
        setCurrent,
        clearCurrent,
        updateJournal,
        clearJournals,
      }}
    >
      {props.children}
    </JournalContext.Provider>
  );
};

export default JournalState;
