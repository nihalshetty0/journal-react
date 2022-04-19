import {
  GET_JOURNALS,
  ADD_JOURNAL,
  DELETE_JOURNAL,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_JOURNAL,
  // FILTER_JOURNAL,
  CLEAR_JOURNAL,
  JOURNAL_ERROR,
} from "../types";

const journalReducer = (state, action) => {
  switch (action.type) {
    case GET_JOURNALS:
      return {
        ...state,
        journals: action.payload,
        loading: false,
      };
    case ADD_JOURNAL:
      return {
        ...state,
        journals: [action.payload, ...state.journals],
        loading: false,
      };

    case DELETE_JOURNAL:
      return {
        ...state,
        journals: state.journals.filter(
          (journal) => journal._id !== action.payload
        ),
        loading: false,
      };

    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };

    case UPDATE_JOURNAL:
      return {
        ...state,
        journals: state.journals.map((journal) =>
          journal._id === action.payload._id ? action.payload : journal
        ),
        loading: false,
      };
    case CLEAR_JOURNAL:
      return {
        ...state,
        journals: null,
      };
    case JOURNAL_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default journalReducer;
