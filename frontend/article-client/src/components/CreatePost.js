import React, { useState, useRef } from "react";
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { getIsActive, getRefresh } from "../redux/tweetSlice";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [image, setImage] = useState(null); // State for image file
  const { user } = useSelector((store) => store.user);
  const { isActive } = useSelector((store) => store.tweet);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const profile =
    "https://res.cloudinary.com/practicaldev/image/fetch/s--wUE2uVbG--/c_imagga_scale,f_auto,fl_progressive,h_900,q_auto,w_1600/https://thepracticaldev.s3.amazonaws.com/i/k1be7tgezvuu845615uf.png";

  const [imgData, setImgData] = useState(profile);

  const submitHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("id", user?._id);
      console.log(imgData);

      formData.append("image", imgData);

      const res = await axios.post(
        `http://localhost:5000/api/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error("Failed to create tweet.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      console.log(error);
    }

    setDescription("");
    setTitle("");
    setFileName("");
  };

  const forYouHandler = () => {
    dispatch(getIsActive(true));
  };

  const followingHandler = () => {
    dispatch(getIsActive(false));
  };

  const uploadImage = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setImage(file);
    }
  };

  function files(e) {
    console.log(e.target.value, e.target.files);
    setImgData(URL.createObjectURL(e.target.files[0]));
    console.log(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="w-[100%]">
      <div>
        <div className="flex items-center justify-evenly border-b border-gray-200">
          <div
            onClick={forYouHandler}
            className={`${
              isActive
                ? "border-b-4 border-blue-600"
                : "border-b-4 border-transparent"
            } cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}
          >
            <h1 className="font-semibold text-gray-600 text-lg">For you</h1>
          </div>
          <div
            onClick={followingHandler}
            className={`${
              !isActive
                ? "border-b-4 border-blue-600"
                : "border-b-4 border-transparent"
            } cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}
          >
            <h1 className="font-semibold text-gray-600 text-lg">Following</h1>
          </div>
        </div>
        <div>
          <div className="flex items-center p-4">
            <div>
              <Avatar
                src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg"
                size="40"
                round={true}
              />
            </div>

            <div>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="outline-none border-none text-xl ml-2 w-96"
                type="text"
                placeholder="Enter headline"
              />
            </div>
          </div>
          <div>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full outline-none border-none text-xl ml-2"
              type="text"
              placeholder="What is happening?!"
            />
          </div>

          <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <div className="flex items-center">
              <span className="w-96 h-1/5  flex justify-between items-center border-2 border-inputbr p-2 ">
                <img src={imgData} className="h-16 w-16 rounded-full" alt="" />
                <input
                  type="file"
                  className="shrink-0 h-9 file:rounded-full file:w-2/3 file:h-full file:border-slate-200 text-slate-500"
                  placeholder="choose"
                  onChange={files}
                />
              </span>
            </div>
            <button
              onClick={submitHandler}
              className="bg-[#1D9BF0] px-4 py-1 text-lg text-white text-right border-none rounded-full"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
