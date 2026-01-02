import { useEffect, useState } from "react";
import API from "../services/api";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await API.get("/auth/users");
      setUsers(res.data);
    } catch (error) {
      console.log("Failed to load users");
    }
  };

  const handleFollow = async (userId) => {
    try {
      await API.put(`/auth/${userId}/follow`);
      loadUsers(); // refresh list
    } catch (error) {
      console.log("Follow failed");
    }
  };

  return (
    <div>
      <h2>Users</h2>

      {users.map((user) => (
        <div
          key={user._id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            margin: "10px"
          }}
        >
          <p><b>{user.username}</b></p>

          <button onClick={() => handleFollow(user._id)}>
            Follow / Unfollow
          </button>
        </div>
      ))}
    </div>
  );
}

export default Users;
