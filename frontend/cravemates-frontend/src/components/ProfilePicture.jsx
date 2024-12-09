import React from "react";

const ProfilePicture = ({ src, size = 40, alt = "Profile Picture" }) => {
  // Use the provided profile picture or the default one
  const profilePicture =
    src || "http://localhost:8000/static/default_avatar.jpg";

  return (
    <img
      src={profilePicture} // Use the updated logic for default
      alt={alt}
      className='rounded-full'
      style={{ width: size, height: size }}
    />
  );
};

export default ProfilePicture;
