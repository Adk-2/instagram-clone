import { useState } from "react";
import API from "../services/api";

function CreatePost({ onPostCreated }) {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage("Please select an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);     // 🔴 must be "image"
      formData.append("caption", caption);

      await API.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });


      setImage(null);
      setCaption("");
      setMessage("Post created ✅");

      onPostCreated();
    } catch (error) {
      setMessage("Failed to create post");
    }
  };

  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
      <h3>Create Post</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br /><br />

        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <br /><br />

        <button type="submit">Post</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default CreatePost;
