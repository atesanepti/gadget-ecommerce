import React, { useState } from "react";

const Image = ({ src, style = "w-full rounded-sm h-full" }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageLoadHandler = () => {
    setImageLoaded(true);
  };

  return (
    <>
      {!imageLoaded && <div className="w-full h-full bg-[#151515] "></div>}
      <img
        className={`${!imageLoaded && "invisible"} ${style}`}
        onLoad={imageLoadHandler}
        src={src}
        alt="product"
        loading="lazy"
      />
    </>
  );
};


export default Image;
