import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
const Performance = ({ data }) => {
  let rankArr = [];
  let bestGain = 0;
  let worstLoss = 0;
  data.forEach(({ rank, oldRating, newRating }) => {
    bestGain = Math.max(bestGain, newRating - oldRating);
    worstLoss = Math.min(worstLoss, newRating - oldRating);
    rankArr.push(rank);
  });
  rankArr.sort((a, b) => a - b);
  const L = rankArr.length;
  const bestRank = rankArr[0];
  const worstRank = rankArr[L - 1];
  const sum = L == 0 ? 0 : rankArr.reduce((a, b) => a + b);
  const avgRank = L == 0 ? 0 : sum / L;
  const medianRank =
    L == 0
      ? 0
      : L % 2
        ? rankArr[(L - 1) / 2]
        : (rankArr[L / 2 - 1] + rankArr[L / 2]) / 2;
  return (
    <>
      <h3>
        Best Rank: <span className="green-font">{bestRank}</span>
      </h3>
      <h3>
        Worst Rank: <span className="red-font">{worstRank}</span>
      </h3>
      <h3>
        Average Rank: <span className="blue-font">{avgRank.toFixed(2)}</span>
      </h3>
      <h3>
        Median Rank: <span className="blue-font">{medianRank.toFixed(1)}</span>
      </h3>
      <h3>
        Best Rating Gain:{" "}
        <span className="green-font">
          {bestGain} <FaArrowTrendUp />
        </span>
      </h3>
      <h3>
        Worst Rating Loss:{" "}
        <span className="red-font">
          {worstLoss} <FaArrowTrendDown />{" "}
        </span>
      </h3>
    </>
  );
};
export default Performance;
