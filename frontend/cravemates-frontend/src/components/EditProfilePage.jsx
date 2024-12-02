import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/editprofile.css";

const EditProfilePage = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    bio: "",
    phoneNumber: "",
    tags: "",
    profile_picture: null,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/edit-profile/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData({
            ...formData,
            ...data,
          });
        }
      } catch (error) {
        setErrorMessage("Error fetching user data.");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profile_picture: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch("/api/edit-profile/", {
        method: "PUT",
        body: formDataToSend,
      });

      if (response.ok) {
        navigate("/profile"); 
      } else {
        const data = await response.json();
        setErrorMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="edit-profile-page">
      <h1>Edit Profile</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="edit-profile-form">
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags"
          value={formData.tags}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="profile_picture"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfilePage;
