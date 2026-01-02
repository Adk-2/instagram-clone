import { useEffect, useState } from "react";
import API from "../services/api";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (error) {
      console.log("Failed to load posts");
    }
  };

  const handleLike = async (postId) => {
    try {
      await API.put(`/posts/${postId}/like`);
      loadPosts();
    } catch (error) {
      console.log("Like failed");
    }
  };

  const handleCommentChange = (postId, value) => {
    setCommentInputs({
      ...commentInputs,
      [postId]: value
    });
  };

  const handleCommentSubmit = async (postId) => {
    const text = commentInputs[postId];
    if (!text) return;

    try {
      await API.post(`/posts/${postId}/comment`, { text });
      setCommentInputs({ ...commentInputs, [postId]: "" });
      loadPosts();
    } catch (error) {
      console.log("Comment failed");
    }
  };

  return (
    <div>
      <h2>Feed</h2>

      {posts.map((post) => (
        <div
          key={post._id}
          style={{
            background: "white",
            maxWidth: "400px",
            margin: "20px auto",
            padding: "15px",
            borderRadius: "6px",
            boxShadow: "0 0 5px rgba(0,0,0,0.1)"
          }}
        >
          <p><b>{post.user?.username}</b></p>

          <img src={post.image} alt="post" width="100%" />

          <p>{post.caption}</p>

          <button onClick={() => handleLike(post._id)}>
            ❤️ {post.likes?.length || 0}
          </button>

          <hr />

          {/* COMMENTS */}
          {(post.comments || []).map((comment, index) => (
            <p key={index}>
              <b>{comment.user?.username}:</b> {comment.text}
            </p>
          ))}

          {/* COMMENT INPUT */}
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentInputs[post._id] || ""}
            onChange={(e) =>
              handleCommentChange(post._id, e.target.value)
            }
          />

          <button onClick={() => handleCommentSubmit(post._id)}>
            Comment
          </button>
        </div>
      ))}
    </div>
  );
}

export default Feed;
