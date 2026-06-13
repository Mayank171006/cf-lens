import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ErrorHandler from "../components/ErrorHandler";
import Loader from "../components/Loader";
import LanguagePie from "../components/ProblemAnalysis/LanguagePie";
import Verdicts from "../components/ProblemAnalysis/Verdicts";
import SolvedByTags from "../components/ProblemAnalysis/SolvedByTags";
import SolvedByRating from "../components/ProblemAnalysis/SolvedByRating";
import TagAccuracy from "../components/ProblemAnalysis/TagAccuracy";
import HardestSolvedPerTag from "../components/ProblemAnalysis/HardestSolvedByTag";
import StrongestWeakest from "../components/ProblemAnalysis/StrongestWeakest";
import ProblemSolvingOverview from "../components/ProblemAnalysis/ProblemSolvingOverview";
import SolvingEfficiency from "../components/ProblemAnalysis/SolvingEfficiency";
import DifficultyMastery from "../components/ProblemAnalysis/DifficultyMastery";

const ProblemAnalysis = () => {
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
          `https://codeforces.com/api/user.status?handle=${handle}`,
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
      <div className="stat-big-container">
        <div className="short-stat-container">
          <h2 className="mb-4">
            <center>
              <b>Problem Solving Overview</b>
            </center>
          </h2>
          <ProblemSolvingOverview data={userData} />
        </div>
        <div className="short-stat-container">
          <h2 className="mb-4">
            <center>
              <b>Solving Efficiency</b>
            </center>
          </h2>
          <SolvingEfficiency data={userData} />
        </div>
        <div className="short-stat-container">
          <h2 className="mb-4">
            <center>
              <b>Difficulty & Mastery</b>
            </center>
          </h2>
          <DifficultyMastery data={userData} />
        </div>
      </div>
      <div className="chart-container">
        <h4>
          <center>Languages Used for Solved Problems</center>
        </h4>
        <LanguagePie data={userData} />
      </div>
      <div className="chart-container">
        <h4>
          <center>Verdicts Distribution</center>
        </h4>
        <Verdicts data={userData} />
      </div>
      <div className="chart-container">
        <h4>
          <center>Problems Solved by Tags</center>
        </h4>
        <SolvedByTags data={userData} />
      </div>
      <div className="chart-container">
        <h4>
          <center>Problems Solved by Ratings</center>
        </h4>
        <SolvedByRating data={userData} />
      </div>
      <div className="chart-container">
        <h4>
          <center>Top Tags by Accuracy(%)</center>
        </h4>
        <TagAccuracy data={userData} />
      </div>
      <div className="chart-container">
        <h4>
          <center>Hardest Solved By Tag</center>
        </h4>
        <HardestSolvedPerTag data={userData} />
      </div>
      <div className="stat-big-container">
        <div className="short-stat-container">
          <h2 className="mb-4">
            <center>
              <b>Topic Strength Analysis</b>
            </center>
          </h2>
          <StrongestWeakest data={userData} />
        </div>
      </div>
    </div>
  );
};
export default ProblemAnalysis;
