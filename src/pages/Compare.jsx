import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ErrorHandler from "../components/ErrorHandler";
import Loader from "../components/Loader";
import SecondHandle from "../components/Compare/SecondHandle";
import QuickComparison from "../components/Compare/QuickComparison";
import RatingVContest from "../components/Compare/RatingVContest";
import TagStrengthCompare from "../components/Compare/TagStrengthCompare";
import ProblemRatingComparison from "../components/Compare/ProblemRatingComparison";
import MoreComparison from "../components/Compare/MoreComparison";

const Compare = () => {
  const handle = useOutletContext();

  const [handle2, setHandle2] = useState("");

  const [user1Data, setuser1Data] = useState(null);
  const [user2Data, setUser2Data] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUserData(userHandle) {
      const [infoResp, ratingResp, statusResp] = await Promise.all([
        fetch(`https://codeforces.com/api/user.info?handles=${userHandle}`, {
          signal: controller.signal,
        }),
        fetch(`https://codeforces.com/api/user.rating?handle=${userHandle}`, {
          signal: controller.signal,
        }),
        fetch(`https://codeforces.com/api/user.status?handle=${userHandle}`, {
          signal: controller.signal,
        }),
      ]);

      const infoObj = await infoResp.json();
      const ratingObj = await ratingResp.json();
      const statusObj = await statusResp.json();

      if (infoObj.status === "FAILED") {
        throw new Error("invalid_user");
      }

      return {
        info: infoObj.result[0],
        rating: ratingObj.result,
        status: statusObj.result,
      };
    }

    async function getUsers() {
      if (!handle || !handle2) return;

      try {
        setLoading(true);
        setError("");
        const u1 = await fetchUserData(handle);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const u2 = await fetchUserData(handle2);

        setuser1Data(u1);
        setUser2Data(u2);
      } catch (err) {
        if (err.name !== "AbortError") {
          if (err.message === "invalid_user") {
            setError("invalid_user");
          } else {
            setError("api_error");
          }
        }
      } finally {
        setLoading(false);
      }
    }

    getUsers();

    return () => {
      controller.abort();
    };
  }, [handle, handle2]);

  if (!handle) {
    return (
      <div className="Home-container">
        <h1 className="white-font">Please enter a codeforces handle</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="Home-container">
        <SecondHandle setHandle2={setHandle2} />
        <ErrorHandler error={error} />
      </div>
    );
  }

  return (
    <div className="Home-container">
      <SecondHandle setHandle2={setHandle2} />
      {loading && <Loader />}
      {!loading && user1Data && user2Data && (
        <>
          <QuickComparison
            user1info={user1Data.info}
            user2info={user2Data.info}
            user1status={user1Data.status}
            user2status={user2Data.status}
          />
          <div className="chart-container">
            <h4 className="mb-3">
              <center>
                <b>Rating Progression Comparison</b>
              </center>
            </h4>
            <RatingVContest
              user1={handle}
              user2={handle2}
              user1Rating={user1Data.rating}
              user2Rating={user2Data.rating}
            />
          </div>
          <div className="chart-container">
            <h4 className="mb-1">
              <center>
                <b>Tag Strength Comparison</b>
              </center>
            </h4>
            <h6>
              <center>
                Average Solved Rating (minimum 5 solved problems per tag)
              </center>
            </h6>
            <TagStrengthCompare
              user1={handle}
              user2={handle2}
              user1Status={user1Data.status}
              user2Status={user2Data.status}
            />
          </div>
          <div className="chart-container">
            <h4 className="mb-3">
              <center>
                <b>Problem Rating Distribution Comparison</b>
              </center>
            </h4>
            <ProblemRatingComparison
              user1={handle}
              user2={handle2}
              user1Status={user1Data.status}
              user2Status={user2Data.status}
            />
          </div>
          <MoreComparison
            user1={handle}
            user2={handle2}
            user1Status={user1Data.status}
            user2Status={user2Data.status}
          />
        </>
      )}
    </div>
  );
};

export default Compare;
