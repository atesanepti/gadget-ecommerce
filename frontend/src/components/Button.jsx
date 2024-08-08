import React from "react";

const Button = ({ children, isLoading, onClick, type, style = "" }) => {
  return (
    <button
      type={`${type && type}`}
      onClick={onClick && onClick}
      className={`bg-pink-600 text-white  cursor-pointer rounded-full text-xs md:text-sm w-[5rem] h-[2rem] block text-center ${style}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="sm-preloder">
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
