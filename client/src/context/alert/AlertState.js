import { useReducer } from "react";

import AlertContext from "./alertContext";
// import AuthContext from "../auth/authContext";

import { v4 as uuidv4 } from "uuid";

import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = (props) => {
  // const authContext = useContext(AuthContext);

  const initialState = [];

  const alertReducer = (state, action) => {
    switch (action.type) {
      case SET_ALERT:
        return [...state, action.payload];
      case REMOVE_ALERT:
        return state.filter((alert) => alert.id !== action.payload);
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (msg, type) => {
    console.log("alert", msg);
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });

    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT, payload: id });
    }, 3000);
  };

  // useEffect(() => {
  //   if (authContext.error !== "") {
  //     setAlert(authContext.error, "danger");
  //     console.log("sd");
  //   }
  // }, [authContext.error]);

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
