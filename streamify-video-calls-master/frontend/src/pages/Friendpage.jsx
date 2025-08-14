import React, { useEffect, useState } from "react";
import axios from "axios";
import FriendCard from "../components/FriendCard.jsx";
import PageLoader from "../components/PageLoader.jsx";
import NoFriendsFound from "../components/NoFriendsFound.jsx";

const Friendpage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

const fetchFriends = async () => {
  try {
    const res = await axios.get("http://localhost:5001/api/users/friends", {
      withCredentials: true,
    });

    console.log("Friend API JSON Response", res.data);
    setFriends(res.data?.friends || []);
  } catch (error) {
    console.error("Failed to fetch friends", error);
    setFriends([]);
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    fetchFriends();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Friends</h1>
      {friends.length === 0 ? (
        <NoFriendsFound />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {friends.map((friend) => (
            <FriendCard key={friend._id} user={friend} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Friendpage;
