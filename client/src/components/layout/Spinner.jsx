import React from "react";
import spinner from "./Spinner.gif";
import spinnerBtn from "./SpinnerBtn.gif";

const Spinner = ({ mode }) => {
  return (
    <img
      src={mode === "btn" ? spinnerBtn : spinner}
      alt='Loading...'
      style={
        mode === "btn"
          ? {
              position: "absolute",
              left: "50px",
              top: "-1px",
              width: "30px",
              filter: "invert(13%)",
              borderRadius: "50%",
            }
          : { width: "200px", margin: "auto", display: "block" }
      }
    />
  );
};

export default Spinner;
