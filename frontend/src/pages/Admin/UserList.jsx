import React, { useEffect, useState } from "react";
import {
  useUserListQuery,
  useUserDeleteMutation,
  useUserUpdateMutation,
} from "../../redux/api/userApiSlice.js";
import { setCredentials } from "../../redux/features/auth/authSlice.js";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaSave } from "react-icons/fa";
import Loader from "../../components/Loader.jsx";
import { useDispatch, useSelector } from "react-redux";

const UserList = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const { data, refetch, isLoading, error } = useUserListQuery();
  const [userDeleteApi, { isLoading: deleteLoading }] = useUserDeleteMutation();
  const [userUpdateApi, { isLoading: saveLoading }] = useUserUpdateMutation();
  const [editableUserId, setEditableUserId] = useState("");
  const [editableUsername, setEditableUsername] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const editChangeHandler = (e) => {
    if (e.target.name === "name") {
      setEditableUsername(e.target.value);
    } else if (e.target.name === "email") {
      setEditableUserEmail(e.target.value);
    }
  };

  const deleteUserHandler = async (userId) => {
    const confirm = window.confirm("Are you sure?");
    if (confirm) {
      try {
        await userDeleteApi({ userId }).unwrap();
        refetch();
      } catch (error) {
        console.error(error);
      }
    } else {
      return;
    }
  };
  const editClickHandler = (userId) => {
    setEditableUserId(userId);
  };

  const saveHandler = async (userId) => {
    const payload = {
      userId: userId,
      username: editableUsername,
      email: editableUserEmail,
    };

    try {
      const response = await userUpdateApi(payload).unwrap();
      if (userId === userInfo.userId) {
        console.log(response);
        dispatch(setCredentials(response));
      }
      refetch();
      setEditableUserEmail("");
      setEditableUsername("");
      setEditableUserId("");

      console.log("updated user = ", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="w-full mx-auto md:w-[90%]  text-white ">
      <h3 className="my-4 md:my-7 text-center mt-[2rem] text-2xl md:text-3xl lg:text-[35px] font-medium lg:font-semibold">
        Users
      </h3>
      <div className="w-full py-6 ">
        <span className="text-white text-sm md:bg-green-600 rounded-md border-b-2 border-green-800 px-3 py-1">
          {data && "Total Users : " + data.length}
        </span>
      </div>
      <div className="w-full overflow-auto ">
        {isLoading ? (
          <Loader />
        ) : error ? (
          "error"
        ) : (
          <div className=" w-full max-h-[60vh] min-w-[530px]">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="text-xs md:text-sm py-2 md:py-3">ID</th>
                  <th className="text-xs md:text-sm py-2 md:py-3">NAME</th>
                  <th className="text-xs md:text-sm py-2 md:py-3">EMAIL</th>
                  <th className="text-xs md:text-sm py-2 md:py-3">ADMIN</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((user) => {
                    return (
                      <tr key={user._id}>
                        <td className="text-xs md:text-sm py-2 md:py-3">
                          {user._id}{" "}
                        </td>
                        <td className="text-xs md:text-sm  py-2 md:py-3">
                          {editableUserId && editableUserId == user._id ? (
                            <div className="flex items-center gap-3">
                              <input
                                className="border-b-2 border-[#2c2d2e] focus:outline-none bg-[#373A40] px-3 py-1 rounded-md"
                                type="text"
                                value={
                                  editableUsername
                                    ? editableUsername
                                    : user.username
                                }
                                onChange={editChangeHandler}
                                name="name"
                              />
                              <span
                                onClick={() => saveHandler(user._id)}
                                className="bg-blue-600 p-2 rounded-md cursor-pointer"
                              >
                                {saveLoading ? "..." : <FaSave />}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <span>{user.username}</span>
                              <FiEdit
                                className="cursor-pointer"
                                onClick={() => editClickHandler(user._id)}
                              />
                            </div>
                          )}
                        </td>

                        <td className="text-xs md:text-sm py-2 md:py-3">
                          {editableUserId && editableUserId == user._id ? (
                            <div className="flex items-center gap-3">
                              <input
                                className="border-b-2 border-[#2c2d2e] focus:outline-none bg-[#373A40] px-3 py-1 rounded-md  "
                                type="email"
                                value={
                                  editableUserEmail
                                    ? editableUserEmail
                                    : user.email
                                }
                                onChange={editChangeHandler}
                                name="email"
                              />
                              <span
                                onClick={() => saveHandler(user._id)}
                                className="bg-blue-600 p-2 rounded-md cursor-pointer"
                              >
                                {saveLoading ? "..." : <FaSave />}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <span>{user.email}</span>
                              <FiEdit
                                className="cursor-pointer"
                                onClick={() => editClickHandler(user._id)}
                              />
                            </div>
                          )}
                        </td>

                        <td className="tabel-admin-col">
                          {user.isAdmin ? (
                            <span>
                              {" "}
                              <IoMdCheckmark className="icon text-green-600 " />
                            </span>
                          ) : (
                            <span>
                              <RxCross2 className="icon text-red-700 " />
                            </span>
                          )}
                          {!user.isAdmin ? (
                            <span
                              onClick={() => deleteUserHandler(user._id)}
                              className="bg-red-600 p-1 md:p-2 rounded-md cursor-pointer"
                            >
                              {deleteLoading ? (
                                "..."
                              ) : (
                                <MdDelete className="icon  text-white rounded-md " />
                              )}
                            </span>
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
