import React, { useEffect, useState } from "react";
import "./ProfileEdit.css";
import Uploader from "../../Components/Uploader/Uploader";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../utils/config";

const ProfileEdit = () => {
  const [image, setImage] = useState();
  const swal = require("sweetalert2");
  const navigate = useNavigate();
  let { user } = useParams();
  let defaultImgUrl =
    "https://cloud-learn-bucket.s3.eu-west-2.amazonaws.com/user.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAQaCWV1LXdlc3QtMiJIMEYCIQCOJH8yQTmim3L4D8DdHEkrvJvaKQ87a4EDrFcEOTQjlgIhAPDM2Q%2FWRCtqh1s7PMjqKkzQ%2Fve8WTaaT8oBXvpKm6boKvsCCF0QABoMMDEwNDM4NDc0NjM4IgwKq9s2iCQJIOEideoq2AKAmF34ljv7L2EM3hwENRtfD3UguFaFj12vLSW3rUW%2Bcu23yB9B3YGuijmAGl5N6LnaWB1YThj1XyFGtrH0AiBqNP4FjoJzyNBg6lNhr%2BqkWBOTXcaP6V%2BGpAMmmPAElDNLDlLmS1sQmcUlAgIy52yyIF1%2BVTHyOWff48lDQAC%2BL9XXKmymkcAxuPe7ognkUNgbNOSNKuLEWmG6DePEHKSaHT1OHz3xUGjAPhEy1xpQHV48uerXpfNOCpe3rGjCWxXKszZfvtnl7fFDzjCjBspHrVV3e%2BqvYZRUE4TzWkOzRigpAh8Oe%2Bo2bokjtH%2B3Cfno5P9k5%2BT%2BYN5UHnDEh48JpTZZFAVBGumquKPPX4Xu5sdSCApcQAKRViK%2FGlmGxhPO9%2B%2Bic66FQvb7BOS2OFl6uISqyXg6QgEagwsnBFB4bBqauvae5Q%2BxrmKtTsINmv0%2BHEmwsJrmLTDr5Jm4BjqyAufNcmu%2FUdgsfxP770hkASxs%2Fo53rOiu2loaGnxwqQBNlBcJVapH7CjNMphhKg8CMtd9YsAteW47PzKee4W0qJm9F%2B95cr8b%2FnL8AyVdlwghSn3SsfuPvHyqTkJ1LD%2BD82D5w4kuMH2ml8wxx9t%2FqpOCqMAPOL0fLIqU26q5F6%2BanWUwVcDXiInxWIsXAuEz8PPxCMKWLMx4XHwsZUvdhUfn07pkDXogJT7PH5Ec2XKlQ7kguvw5KrX05ii7pvXwnsOPa5hoUz4MVc1tUyUBGg4mh4JUxOTYD9I7GmQ6gDNPRkhGx%2FaCwPaRTHtmKt7tjMTHFKuQyv4ZEK2XTLrKYPGczFp1nWbapQ9nQX4AQYF1GdfAjoiK%2FF26zL5nq6MkWwbor9M7GxnZJtupLhi3uEY0YQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241009T121046Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQE3ROPOHM5PJO7AF%2F20241009%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Signature=396707eedda1530abb0b8a03bc18a1fc88ff9a58ae1c09195a9e1966773a2fcf";

  const [profile, setProfile] = useState({
    full_name: "",
    bio: "",
    image: image,
    verified: false,
  });

  const urlFetch = `${BASE_URL}/api/profiles/${user}/`;

  useEffect(() => {
    const fetchProfileDetail = async () => {
      try {
        const response = await fetch(urlFetch);
        if (!response.ok) {
          console.error(
            "Error fetching profile data:",
            response.status,
            response.statusText,
          );
          return;
        }
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        alert("Error fetching details: " + error);
      }
    };
    fetchProfileDetail();
  }, [urlFetch]);

  const url = `${BASE_URL}/api/profiles/${profile.user}/edit/`;

  const updateProfile = async () => {
    const formData = new FormData();
    formData.append("full_name", profile.full_name);
    formData.append("bio", profile.bio);
    formData.append("user", profile.id);
    // formData.append('id', profile.id);

    console.log("typeof cover", typeof cover);
    console.log("instance of file", image instanceof File);

    if (image) {
      formData.append("image", image);
    }
    console.log(image);

    try {
      const response = await fetch(url, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        console.error(
          "Error updating profile. Server responded with:",
          response.status,
          response.statusText,
        );
        return;
      }

      const data = await response.json();
      setProfile(data);
      swal.fire({
        title: "Profile updated successfully!",
        icon: "success",
        toast: "true",
        timer: 2000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
      navigate(-1);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const cancel = () => {
    navigate("/learning");
  };

  const [inputKey] = useState(Date.now());

  let imagePath = "No Image";

  if (profile.image) {
    imagePath = profile.image;
  }

  const getImageName = (path) => {
    const parts = path.split("/");
    return parts[parts.length - 1];
  };

  const imageName = getImageName(imagePath);

  return (
    <div className="edit-profile-container">
      <h1>Edit</h1>
      <div className="section-form">
        <div className="cover-preview">
          <h1>Current Image</h1>
          {profile.image ? (
            <img src={profile.image} alt="section cover" />
          ) : (
            <img src={defaultImgUrl} alt="section cover" />
          )}
          <section className="uploaded-row">
            <p>{imageName}</p>
          </section>
        </div>

        <div className="horizontal-container cover-container">
          <Uploader inputKey={inputKey} setCover={setImage} />
        </div>

        <input
          className="section-title-input"
          type="text"
          name="title"
          placeholder="Full Name..."
          value={profile.full_name}
          onChange={(e) =>
            handleInputChange({
              target: { value: e.target.value, name: "full_name" },
            })
          }
        />
        <textarea
          className="section-subtitle-input"
          type="text"
          name="subtitle"
          placeholder="Bio..."
          value={profile.bio}
          onChange={(e) =>
            handleInputChange({
              target: { value: e.target.value, name: "bio" },
            })
          }
        />

        <button className="section-add-btn" onClick={updateProfile}>
          Done
        </button>

        <button className="section-cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProfileEdit;
