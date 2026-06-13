import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ErrorHandler from "../components/ErrorHandler";
import Loader from "../components/Loader";

const Home = () => {
  const handle = useOutletContext();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    async function getUserInfo(handle) {
      setError(null);
      if (!handle) return;

      try {
        const userInfoResp = await fetch(
          `https://codeforces.com/api/user.info?handles=${handle}`,
          { signal: controller.signal },
        );
        const userInfo = await userInfoResp.json();

        if (userInfo.status === "FAILED") {
          setError("invalid_user");
          return;
        }
        setUser(userInfo.result[0]);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("api_error");
        }
      }
    }
    getUserInfo(handle);
    return () => {
      controller.abort();
    };
  }, [handle]);

  if (!handle) {
    return (
      <div className="Home-container">
        <h1 className="white-font">Please enter a codeforces handle</h1>
      </div>
    );
  }

  if (error) {
    return <ErrorHandler error={error}></ErrorHandler>;
  }

  if (!user) {
    return <Loader></Loader>;
  }

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");
  return (
    <div className="Home-container">
      <div className="user-image-container">
        <img src={user.titlePhoto} className="profile-pic"></img>
      </div>
      <div className="user-info">
        <ul>
          <li>Name: {fullName || user.handle}</li>
          <li>Rank: {user.rank || "unrated"} </li>
          <li>Rating: {user.rating || "unrated"}</li>
          <li>Max Rank: {user.maxRank || "unrated"} </li>
          <li>Max Rating: {user.maxRating || "unrated"}</li>
          <li>Contribution: {user.contribution}</li>
          <li>Country: {user.country || "Not specified"}</li>
          <li>City: {user.city || "Not specified"}</li>
          <li>Organization: {user.organization || "Not specified"}</li>
        </ul>
      </div>
    </div>
  );
};
export default Home;
