import React from "react";

const ProductLoader = ({ qnt, style }) => {
  const elements = qnt ? [...Array(qnt)] : [...Array(3)];
  return (
    <>
      {elements.map((_, i) => (
        <div key={i} className={style}></div>
      ))}
    </>
  );
};

export default ProductLoader;
