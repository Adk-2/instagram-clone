import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);

    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        loadMyProfile();
    }, []);

    const loadMyProfile = async () => {
        try {
            // Get profile info
            const profileRes = await API.get("/auth/me");
            setFollowers(profileRes.data.followers.length);
            setFollowing(profileRes.data.following.length);

            // Get logged-in user profile
            // Get all posts
            const res = await API.get("/posts");

            // Decode token to get logged-in user id
            const token = localStorage.getItem("token");
            const payload = JSON.parse(atob(token.split(".")[1]));
            const myUserId = payload.id;

            // Filter only my posts
            const myPosts = res.data.filter(
                (post) => post.user._id === myUserId
            );

            setPosts(myPosts);

            if (myPosts.length > 0) {
                setUsername(myPosts[0].user.username);
            }

        } catch (error) {
            console.log("Failed to load profile");
        }
    };

    return (
        <div>
            <h2>My Profile</h2>

            <p><b>Username:</b> {username}</p>
            <p><b>Followers:</b> {followers}</p>
            <p><b>Following:</b> {following}</p>

            <p><b>Total Posts:</b> {posts.length}</p>

            <hr />

            {posts.map((post) => (
                <div key={post._id} style={{ marginBottom: "15px" }}>
                    <img src={post.image} alt="post" width="200" />
                    <p>{post.caption}</p>
                </div>
            ))}
        </div>
    );
}

export default Profile;
