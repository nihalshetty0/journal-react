import React from "react";

const Body = (props) => {
  return (
    <div className='flex justify-center pt-16 relative'>
      <div className='container mx-10 min-h-[100vh] max-w-3xl relative'>
        {props.children}
      </div>
    </div>
  );
};

export default Body;
