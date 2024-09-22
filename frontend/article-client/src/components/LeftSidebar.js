import React from "react";
import { CiHome } from "react-icons/ci";
import { CiHashtag } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { getMyProfile, getOtherUsers, getUser } from "../redux/userSlice";

const LeftSidebar = () => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/logout");

      // Dispatch actions to clear user data
      dispatch(getUser(null));
      dispatch(getOtherUsers(null));
      dispatch(getMyProfile(null));

      // Navigate to login page
      navigate("/login");

      // Show success toast
      toast.success(res.data.message);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout.");
    }
  };

  return (
    <div className="w-[20%]">
      <div>
        <div>
          <img
            className="ml-5"
            width={"50px"}
            src="https://static.vecteezy.com/system/resources/previews/011/658/585/non_2x/letter-a-abstract-logo-flat-capital-letter-a-abstract-logo-icon-image-with-transparent-background-png.png"
            alt="logo"
          />
        </div>
        <div className="my-4">
          <Link
            to="/"
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full"
          >
            <div>
              <CiHome size="24px" />
            </div>
            <h1 className="font-bold text-lg ml-2">Home</h1>
          </Link>

          <Link to="/explore">
            <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
              <div>
                <CiHashtag size="24px" />
              </div>
              <h1 className="font-bold text-lg ml-2">Explore</h1>
            </div>
          </Link>

          <Link to="#">
            <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
              <div>
                <IoIosNotificationsOutline size="24px" />
              </div>
              <h1 className="font-bold text-lg ml-2">Notifications</h1>
            </div>
          </Link>

          <Link
            to={`/profile/${user?._id}`}
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full"
          >
            <div>
              <CiUser size="24px" />
            </div>
            <h1 className="font-bold text-lg ml-2">Profile</h1>
          </Link>

          <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full">
            <div>
              <CiBookmark size="24px" />
            </div>
            <h1 className="font-bold text-lg ml-2">Bookmarks</h1>
          </div>

          <div
            onClick={logoutHandler}
            className="flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full"
          >
            <div>
              <AiOutlineLogout size="24px" />
            </div>
            <h1 className="font-bold text-lg ml-2">Logout</h1>
          </div>

          <button className="px-4 py-2 border-none text-md bg-[#1D9BF0] w-full rounded-full text-white font-bold">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
