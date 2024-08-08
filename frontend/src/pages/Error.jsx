import React from 'react'
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="w-4/5 mx-auto  flex justify-center items-center h-screen">
      <div>
        <h3 className=" text-[50px] font-black text-white">
          4<span className='text-[70px]'>0</span>4
        </h3>
        
        <Link to="/" className='block bg-transparent border border-pink-700 rounded-md cursor-pointer text-pink-700 px-3 py-1 md:px-4 md:py-2 '>Home Page</Link>
      </div>
    </div>
  );
}

export default Error