import React, { useEffect, useState } from "react";
import axios from "axios";
import Tweet from "./Tweet"; 
import { TWEET_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";

const Explore = () => {
  const [tweets, setTweets] = useState([]);

  // Fetch all tweets when component mounts
  useEffect(() => {
    const fetchAllTweets = async () => {
      try {
        // console.log("Making API request...");
        const response = await axios.get(`${TWEET_API_END_POINT}/explore`, {
          withCredentials: true,
        });
        // console.log("Response:", response); 
        if (response.status === 200) {
          setTweets(response.data.tweets); 
        } else {
          toast.error("Failed to fetch tweets");
        }
      } catch (error) {
        // console.error("Error fetching tweets:", error);
        toast.error("Error fetching tweets");
      }
    };

    fetchAllTweets();
  }, []);

  return (
    <div className="explore-tweets">
      <h1 className="text-2xl font-bold mb-4 mt-6 text-center">Explore Tweets</h1>
      {tweets.length > 0 ? (
        tweets.map((tweet) => <Tweet key={tweet._id} tweet={tweet} />)
      ) : (
        <p>No tweets available</p>
      )}
    </div>
  );
};

export default Explore;
