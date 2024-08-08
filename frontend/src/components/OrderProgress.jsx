import { IoCheckmarkCircle } from "react-icons/io5";
const OrderProgress = ({ step1, step2, step3 }) => {
  return (
    <div className="w-[300px] md:w-[500px] mx-auto py-3 flex  items-center ">
      <div className="flex-1">
        {step1 && (
          <div className="flex  items-center">
            <div className="flex items-center flex-col  mx-3">
              <span className="text-pink-600 text-sm font-medium">Login</span>
              <IoCheckmarkCircle className="text-pink-600 text-base" />
            </div>
            {step2 && (
              <div className="w-[50px] md:w-[100px] h-[1px] bg-pink-600 "></div>
            )}
          </div>
        )}
        {!step1 && (
          <span className="text-gray-400 text-sm mx-3 block">Login</span>
        )}
      </div>

      <div className="flex-1">
        {step1 && step2 && (
          <div className="flex  items-center">
            <div className="flex items-center flex-col mx-3">
              <span className="text-pink-600 text-sm font-medium">
                Shipping
              </span>
              <IoCheckmarkCircle className="text-pink-600 text-base" />
            </div>
            {step3 && (
              <div className="w-[50px] md:w-[100px] h-[1px] bg-pink-600 "></div>
            )}
          </div>
        )}
        {!step2 && (
          <span className="text-gray-400 text-sm mx-3 block">Shipping</span>
        )}
      </div>

      <div className="flex-1  ">
        {step1 && step2 && step3 && (
          <div className="flex  items-center">
            <div className="flex items-center flex-col mx-3">
              <span className="text-pink-600 text-sm font-medium">Summary</span>
              <IoCheckmarkCircle className="text-pink-600 text-base" />
            </div>
          </div>
        )}
        {!step3 && (
          <span className="text-gray-400 text-sm block mx-3">Summary</span>
        )}
      </div>
    </div>
  );
};

export default OrderProgress;
