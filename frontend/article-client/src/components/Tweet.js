import React, { useState } from "react";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiEdit, CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { getRefresh } from "../redux/tweetSlice";
import { timeSince } from "../utils/constant";

// const Tweet = ({ tweet }) => {
//   const { user } = useSelector((store) => store.user);
//   const dispatch = useDispatch();
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     id: tweet?._id,
//     title: tweet?.title,
//     description: tweet?.description,
//     image: tweet?.image?.url,
//   });

//   // console.log("Tweet:", tweet);

//   const isLikedByUser = tweet?.like?.includes(user?._id);

//   // console.log("Current User ID:", user?._id);
//   // console.log("Tweet User ID:", tweet?.userId);

//   const likeOrDislikeHandler = async (id) => {
//     try {
//       const res = await axios.put(
//         `${TWEET_API_END_POINT}/like/${id}`,
//         { id: user?._id },
//         { withCredentials: true }
//       );
//       dispatch(getRefresh());
//       toast.success(res.data.message);
//     } catch (error) {
//       toast.error(error.response.data.message);
//       console.log(error);
//     }
//   };

//   const editTweetHandler = async () => {
//     try {
//       const response = await axios.put(
//         `${TWEET_API_END_POINT}/edit/${formData.id}`,
//         formData,
//         { withCredentials: true }
//       );
//       if (response.status === 200) {
//         toast.success("Edit successful");
//         setIsEditing(false); // Exit edit mode
//         dispatch(getRefresh()); // Refresh the tweet list
//       } else {
//         toast.error("Edit failed");
//       }
//     } catch (error) {
//       toast.error("Error: " + error.response.data.message);
//       console.error("Error:", error);
//     }
//   };

//   const deleteTweetHandler = async (id) => {
//     try {
//       const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`, {
//         withCredentials: true,
//       });
//       dispatch(getRefresh());
//       toast.success(res.data.message);
//     } catch (error) {
//       toast.error(error.response.data.message);
//       console.log(error);
//     }
//   };

//   return (
//     <div className="border-b border-gray-200">
//       <div>
//         <div className="flex p-4">
//           <Avatar
//             src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg"
//             size="40"
//             round={true}
//           />
//           <div className="ml-2 w-full">
//             <div className="flex items-center">
//               <h1 className="font-bold">{tweet?.userDetails[0]?.name}</h1>
//               <p className="text-gray-500 text-sm ml-1">{`@${
//                 tweet?.userDetails[0]?.username
//               } . ${timeSince(tweet?.createdAt)}`}</p>
//             </div>

//             {/* edit */}
//             <div>
//               {isEditing ? (
//                 <>
//                   <input
//                     type="text"
//                     value={formData.title}
//                     onChange={(e) =>
//                       setFormData({ ...formData, title: e.target.value })
//                     }
//                     className="text-2xl font-medium"
//                   />
//                   <textarea
//                     value={formData.description}
//                     onChange={(e) =>
//                       setFormData({ ...formData, description: e.target.value })
//                     }
//                     className="w-full"
//                   />
//                   <button
//                     onClick={editTweetHandler}
//                     className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
//                   >
//                     Done
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <p className="text-2xl font-medium">{tweet?.title}</p>
//                   <p>{tweet?.description}</p>
//                   <img
//                     src={tweet?.image?.url}
//                     className="h-[100px] w-[100px] rounded-full"
//                   />
//                 </>
//               )}
//             </div>

//             {/* like, comment, bookmark */}
//             <div className="flex justify-between my-3">
//               <div className="flex items-center">
//                 <div className="p-2 hover:bg-green-200 rounded-full cursor-pointer">
//                   <FaRegComment size="20px" />
//                 </div>
//                 <p>0</p>
//               </div>
//               <div className="flex items-center">
//                 <div
//                   onClick={() => likeOrDislikeHandler(tweet?._id)}
//                   className="p-2 hover:bg-pink-200 rounded-full cursor-pointer"
//                 >
//                   <CiHeart
//                     size="24px"
//                     className={isLikedByUser ? "text-red-500" : ""}
//                   />
//                 </div>
//                 <p>{tweet?.like?.length}</p>
//               </div>
//               <div className="flex items-center">
//                 <div className="p-2 hover:bg-yellow-200 rounded-full cursor-pointer">
//                   <CiBookmark size="24px" />
//                 </div>
//                 <p>0</p>
//               </div>

//               {user?._id === tweet?.userId._id && (
//                 <>
//                   <div
//                     onClick={() => setIsEditing((prev) => !prev)}
//                     className="flex items-center cursor-pointer"
//                   >
//                     <div className="p-2 hover:bg-yellow-200 rounded-full">
//                       <CiEdit size="24px" />
//                     </div>
//                   </div>
//                   <div
//                     onClick={() => deleteTweetHandler(tweet?._id)}
//                     className="flex items-center"
//                   >
//                     <div className="p-2 hover:bg-red-300 rounded-full cursor-pointer">
//                       <MdOutlineDeleteOutline size="24px" />
//                     </div>
//                   </div>
//                 </>
//               )}

//               {/* {true && ( // Always true to test rendering
//                 <>
//                   <div
//                     onClick={() => setIsEditing((prev) => !prev)}
//                     className="flex items-center cursor-pointer"
//                   >
//                     <div className="p-2 hover:bg-yellow-200 rounded-full">
//                       <CiEdit size="24px" />
//                     </div>
//                   </div>
//                   <div
//                     onClick={() => deleteTweetHandler(tweet?._id)}
//                     className="flex items-center"
//                   >
//                     <div className="p-2 hover:bg-red-300 rounded-full cursor-pointer">
//                       <MdOutlineDeleteOutline size="24px" />
//                     </div>
//                   </div>
//                 </>
//               )} */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Tweet;


const Tweet = ({ tweet }) => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: tweet?._id || "", // Safe access
    title: tweet?.title || "",
    description: tweet?.description || "",
    image: tweet?.image?.url || "",
  });

  const isLikedByUser = tweet?.like?.includes(user?._id);

  const likeOrDislikeHandler = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}/like/${id}`,
        { id: user?._id },
        { withCredentials: true }
      );
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const editTweetHandler = async () => {
    try {
      const response = await axios.put(
        `${TWEET_API_END_POINT}/edit/${formData.id}`,
        formData,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Edit successful");
        setIsEditing(false); // Exit edit mode
        dispatch(getRefresh()); // Refresh the tweet list
      } else {
        toast.error("Edit failed");
      }
    } catch (error) {
      toast.error("Error: " + error.response.data.message);
      console.error("Error:", error);
    }
  };

  const deleteTweetHandler = async (id) => {
    try {
      const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  if (!tweet || !tweet?._id) {
    return <div>Tweet not found</div>; // Handle missing tweet data
  }

  return (
    <div className="border-b border-gray-200">
      <div>
        <div className="flex p-4">
          <Avatar
            src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg"
            size="40"
            round={true}
          />
          <div className="ml-2 w-full">
            <div className="flex items-center">
              <h1 className="font-bold">
                {tweet?.userDetails?.[0]?.name || "Unknown"}
              </h1>
              <p className="text-gray-500 text-sm ml-1">
                @{tweet?.userDetails?.[0]?.username || "unknown"} ·{" "}
                {timeSince(tweet?.createdAt)}
              </p>
            </div>

            {/* edit */}
            <div>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="text-2xl font-medium"
                  />
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full"
                  />
                  <button
                    onClick={editTweetHandler}
                    className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
                  >
                    Done
                  </button>
                </>
              ) : (
                <>
                  <p className="text-2xl font-medium">
                    {tweet?.title || "Untitled"}
                  </p>
                  <p>{tweet?.description || "No description available"}</p>
                  {tweet?.image?.url && (
                    <img
                      src={tweet?.image?.url}
                      className="h-[100px] w-[100px] rounded-full"
                    />
                  )}
                </>
              )}
            </div>

            {/* like, comment, bookmark */}
            <div className="flex justify-between my-3">
              <div className="flex items-center">
                <div className="p-2 hover:bg-green-200 rounded-full cursor-pointer">
                  <FaRegComment size="20px" />
                </div>
                <p>0</p>
              </div>
              <div className="flex items-center">
                <div
                  onClick={() => likeOrDislikeHandler(tweet?._id)}
                  className="p-2 hover:bg-pink-200 rounded-full cursor-pointer"
                >
                  <CiHeart
                    size="24px"
                    className={isLikedByUser ? "text-red-500" : ""}
                  />
                </div>
                <p>{tweet?.like?.length}</p>
              </div>
              <div className="flex items-center">
                <div className="p-2 hover:bg-yellow-200 rounded-full cursor-pointer">
                  <CiBookmark size="24px" />
                </div>
                <p>0</p>
              </div>

              {user?._id === tweet?.userId?._id && (
                <>
                  <div
                    onClick={() => setIsEditing((prev) => !prev)}
                    className="flex items-center cursor-pointer"
                  >
                    <div className="p-2 hover:bg-yellow-200 rounded-full">
                      <CiEdit size="24px" />
                    </div>
                  </div>
                  <div
                    onClick={() => deleteTweetHandler(tweet?._id)}
                    className="flex items-center"
                  >
                    <div className="p-2 hover:bg-red-300 rounded-full cursor-pointer">
                      <MdOutlineDeleteOutline size="24px" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
