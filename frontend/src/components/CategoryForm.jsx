import React from "react";
import Button from './Button';

const CategoryForm = ({
  name,
  setName,
  buttonText = "Submit",
  handleDelete,
  setCategoryHandler,
}) => {
  const changeHandler = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="w-full">
      <input
        className="w-full border border-gray-500 bg-transparent outline-none focus:outline-none rounded-md px-4 py-2 text-white"
        type="text"
        placeholder="write category name"
        value={name}
        onChange={changeHandler}
      />
      <br />
      <br />
      <div className="flex items-center justify-between">
        <Button  onClick={() => setCategoryHandler(name)}>
          {buttonText}
        </Button>

        {handleDelete && (
          <Button style="bg-red-600" onClick={handleDelete}  >
            Delete
          </Button>
         
        )}
      </div>
    </div>
  );
};

export default CategoryForm;
