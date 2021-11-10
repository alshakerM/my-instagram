import "./StoryAvatar.css";
import React from "react";
import { Link } from "react-router-dom";

export function StoryAvatar({ user, isUserNameNeeded }) {
  const userId = user.user_id;

  return (
    <div id={isUserNameNeeded? "" : "user-avatar-small"} className="story-avatar">
      <div className="circle">
        <Link className="circle2" to={`/stories/${userId}`}>
          <img  src={user.user_thumbnail} alt={`${user.user_name} avatar`} className="story-user-avatar" />
        </Link>
      </div>
      {isUserNameNeeded ?  <p className="story-avatar-username">{user.user_name}</p> : "" }
     
    </div>
  );
}
