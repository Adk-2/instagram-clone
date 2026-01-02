import { useState } from "react";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import CreatePost from "./pages/CreatePost";
import Users from "./pages/Users";
import Profile from "./pages/Profile";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );
  const [page, setPage] = useState("feed");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div>
      <h1>Instagram Clone 🚀</h1>

      {isLoggedIn ? (
        <>
          <button onClick={() => setPage("feed")}>Feed</button>
          <button onClick={() => setPage("users")}>Users</button>
          <button onClick={() => setPage("profile")}>Profile</button>
          <button onClick={handleLogout}>Logout</button>

          <CreatePost onPostCreated={() => window.location.reload()} />

          {page === "feed" && <Feed />}
          {page === "users" && <Users />}
          {page === "profile" && <Profile />}

        </>
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}

export default App;
