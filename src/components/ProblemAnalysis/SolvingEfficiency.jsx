const SolvingEfficiency = ({ data }) => {
  let mp = {};
  let accepSub = 0;
  [...data].reverse().forEach(({ problem, verdict }) => {
    const probId = `${problem.contestId}-${problem.index}`;
    if (!mp[probId]) {
      mp[probId] = {
        attempts: 1,
        solved: false,
      };
    } else if (!mp[probId].solved) {
      mp[probId].attempts++;
    }
    if (verdict === "OK") {
      mp[probId].solved = true;
      accepSub++;
    }
  });
  let oneShot = 0;
  let totSolve = 0;
  let attemptSolvedSum = 0;
  for (const value of Object.values(mp)) {
    if (value.attempts === 1 && value.solved) oneShot++;
    if (value.solved) {
      totSolve++;
      attemptSolvedSum += value.attempts;
    }
  }
  let oneShotRate =
    totSolve === 0 ? 0 : ((oneShot / totSolve) * 100).toFixed(2);
  let avgAttemptsToSolve = totSolve
    ? (attemptSolvedSum / totSolve).toFixed(2)
    : undefined;
  return (
    <>
      <span>
        <b>Total Submissions: </b>
        <b className="blue-font">{data.length}</b>
      </span>
      <br />
      <span>
        <b>Accepted Submissions: </b>
        <b className="green-font">{accepSub}</b>
      </span>
      <br />
      <span>
        <b>Solved with One Submission: </b>
        <b className="green-font">{oneShot}</b>
      </span>
      <br />
      <span>
        <b>One Shot Solve Rate: </b>
        <b className="green-font">{oneShotRate}% </b>
      </span>
      <br />
      <span>
        <b>Average Attempts to Solve: </b>
        <b className="blue-font">{avgAttemptsToSolve}</b>
      </span>
    </>
  );
};
export default SolvingEfficiency;
