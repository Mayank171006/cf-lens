const DifficultyMastery = ({ data }) => {
  let solvedMap = {};
  let hardestAttempted = 0;
  data.forEach(({ problem, verdict }) => {
    let probId = `${problem.contestId}-${problem.index}`;
    if (problem.rating)
      hardestAttempted = Math.max(hardestAttempted, problem.rating);
    if (verdict === "OK" && problem.rating) {
      solvedMap[probId] = problem.rating;
    }
  });
  let ratingSum = 0;
  let ratingArr = [];
  let greater2000 = 0;
  for (const value of Object.values(solvedMap)) {
    ratingSum += value;
    ratingArr.push(value);
    if (value >= 2000) greater2000++;
  }
  const L = ratingArr.length;
  const avgRating = L == 0 ? 0 : (ratingSum / L).toFixed(2);
  ratingArr.sort((a, b) => b - a);
  const medianRating =
    L == 0
      ? 0
      : L % 2
        ? ratingArr[(L - 1) / 2]
        : (ratingArr[L / 2 - 1] + ratingArr[L / 2]) / 2;

  return (
    <>
      <span>
        <b>Average Solved Rating: </b>
        <b className="blue-font">{avgRating}</b>
      </span>
      <br />
      <span>
        <b>Median Solved Rating: </b>
        <b className="blue-font">{medianRating}</b>
      </span>
      <br />
      <span>
        <b>Highest Rated Solved: </b>
        <b className="green-font">{L > 0 ? ratingArr[0] : 0}</b>
      </span>
      <br />
      <span>
        <b>Hardest Attempted: </b>
        <b className="green-font">{hardestAttempted} </b>
      </span>
      <br />
      <span>
        <b>Problems ≥ 2000 Solved: </b>
        <b className="blue-font">{greater2000}</b>
      </span>
      <br />
    </>
  );
};
export default DifficultyMastery;
