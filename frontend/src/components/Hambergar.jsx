import React from "react";

const Hambergar = (props) => {
    const { navigateMenuToggle,Icon } = props;
  return (
    <div className="nav-toggler" onClick={navigateMenuToggle}>
      <Icon className="text-3xl" />
    </div>
  );
};

export default Hambergar;
