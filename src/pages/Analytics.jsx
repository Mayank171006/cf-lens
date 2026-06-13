import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ErrorHandler from "../components/ErrorHandler";
import Loader from "../components/Loader";
import RatingVTime from "../components/Analytics/RatingVTime";
import RankVTime from "../components/Analytics/RankVTime";
import ContestRankDist from "../components/Analytics/ContestRankDist";
import Performance from "../components/Analytics/Performance";
import Consistency from "../components/Analytics/Consistency";
const Analytics = () => {
  const handle = useOutletContext();
  const [userData, setUserData] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    async function getUserInfo(handle) {
      setError(null);
      if (!handle) return;

      try {
        const userInfoResp = await fetch(
          `https://codeforces.com/api/user.rating?handle=${handle}`,
          { signal: controller.signal },
        );
        const userInfo = await userInfoResp.json();

        if (userInfo.status === "FAILED") {
          setError("invalid_user");
          return;
        }
        setUserData(userInfo.result);
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

  if (!userData) {
    return <Loader></Loader>;
  }
  return (
    <div className="Home-container">
      <div className="chart-container">
        <h4 className="mb-3">
          <center>Codeforces Rating History</center>
        </h4>
        <RatingVTime data={userData}></RatingVTime>
      </div>
      <div className="chart-container">
        <h4 className="mb-3">
          <center>Codeforces Rank History</center>
        </h4>
        <RankVTime data={userData}></RankVTime>
      </div>
      <div className="chart-container">
        <h4 className="mb-3">
          <center>Contest Rank Distribution</center>
        </h4>
        <ContestRankDist data={userData} />
      </div>
      <div className="stat-big-container">
        <div className="stat-container">
          <h2 className="mb-3">
            <b>
              <center>Performance Stats</center>
            </b>
          </h2>
          <Performance data={userData}></Performance>
        </div>
        <div className="stat-container">
          <h2 className="mb-3">
            <b>
              <center>Consistency Stats</center>
            </b>
          </h2>
          <Consistency data={userData}></Consistency>
        </div>
      </div>
    </div>
  );
};
export default Analytics;
