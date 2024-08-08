import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearState } from "../redux/features/notice/naticSlice.js";
import { ERROR, SUCCESS } from "../redux/constants";
import { MdOutlineErrorOutline } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { IoShieldCheckmark } from "react-icons/io5";
const NoticeContainer = () => {
  const nofice = useSelector((state) => state.notice);
  const dispatch = useDispatch();
  const closeHandler = () => {
    dispatch(clearState());
  };

  useEffect(() => {
    if (nofice.variant) {
      setTimeout(() => {
        closeHandler();
      }, 3000);
    }
  }, [nofice.variant]);

  return (
    <div className="fixed top-10 right-10 z-[3000]">
      {nofice.variant == ERROR && (
        <div className="flex relative  justify-start gap-3 w-[300px] py-3 px-3 bg-[#151515]  items-center text-center">
          <div>
            {<MdOutlineErrorOutline className="text-xl text-red-600 mx-auto" />}
          </div>
          <span className="text-sm text-gray-300">{nofice.value}</span>
          <button
            onClick={closeHandler}
            className="absolute top-[12px] right-4"
          >
            <MdClose className="text-xl text-gray-600" />
          </button>

          <div
            id="timingLine"
            className="absolute bottom-0 left-0 w-full h-[3px] bg-red-600 rounded-md"
          ></div>
        </div>
      )}
      {nofice.variant == SUCCESS && (
        <div className="flex relative  justify-start gap-3 w-[300px] py-3 px-3 bg-[#151515]  items-center text-center">
          <div>
            {<IoShieldCheckmark className="text-xl text-green-600 mx-auto" />}
          </div>
          <span className="text-sm text-gray-300">{nofice.value}</span>
          <button
            onClick={closeHandler}
            className="absolute top-[12px] right-4"
          >
            <MdClose className="text-xl text-gray-600" />
          </button>

          <div
            id="timingLine"
            className="absolute bottom-0 left-0 w-full h-[3px] bg-green-600 rounded-md"
          ></div>
        </div>
      )}
    </div>
  );
};

export default NoticeContainer;
