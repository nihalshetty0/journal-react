import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

const Alert = () => {
  const alertContext = useContext(AlertContext);

  return (
    <>
      {alertContext.alerts.length > 0 &&
        alertContext.alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex p-2 mb-1 rounded-md text-sm bg-red-500`}
            classkey={alert.id}
          >
            {alert.msg}
          </div>
        ))}
    </>
  );
};

export default Alert;
