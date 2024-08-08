import React from "react";
import { RxCross2 } from "react-icons/rx";

const PhotoGallery = ({ imagePath, toggleGalleryImage }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-transparent z-50 ">
      <div
        className="absolute top-0 left-0 w-full h-full bg-[#00000081]"
        onClick={() => toggleGalleryImage()}
      ></div>
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[600px] ">
        <RxCross2
          className="text-white text-base cursor-pointer mb-4 mr-0 block"
          onClick={() => toggleGalleryImage()}
        />
        <img src={imagePath} alt="product" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default PhotoGallery;
