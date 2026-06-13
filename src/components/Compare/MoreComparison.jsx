import HeroComparisonCard from "./HeroComparisonCard";

function computeStats(status, stats) {
  let mp = {};
  let tags = new Set();
  let ratings = [];
  let oneShotAttempts = 0;
  let sumToSolve = 0;
  let totSuccessAttempts = 0;
  [...status].reverse().forEach(({ problem, verdict }) => {
    const probId = `${problem.contestId}-${problem.index}`;
    if (!mp[probId]) {
      mp[probId] = {
        attempts: 0,
        solved: false,
      };
    }
    if (!mp[probId].solved) {
      mp[probId].attempts++;
      if (verdict === "OK") {
        mp[probId].solved = true;
        if (problem.rating) ratings.push(problem.rating);
      }
    }
    if (verdict === "OK") {
      problem.tags.forEach((tag) => {
        tags.add(tag);
      });
    }
  });
  for (const [name, value] of Object.entries(mp)) {
    if (value.solved) {
      totSuccessAttempts++;
      sumToSolve += value.attempts;
      if (value.attempts === 1) {
        oneShotAttempts++;
      }
    }
  }
  stats.oneShot = oneShotAttempts;
  stats.oneShotRate =
    totSuccessAttempts != 0
      ? Number(((oneShotAttempts / totSuccessAttempts) * 100).toFixed(2))
      : 0;
  stats.avgAttempts =
    totSuccessAttempts != 0
      ? Number((sumToSolve / totSuccessAttempts).toFixed(2))
      : 0;
  stats.uniqueTags = tags.size;
  ratings.sort((a, b) => a - b);
  const L = ratings.length;
  stats.avgSolved =
    L != 0 ? Number((ratings.reduce((a, b) => a + b) / L).toFixed(2)) : 0;
  stats.medianSolved =
    L != 0
      ? L % 2
        ? ratings[(L - 1) / 2]
        : (ratings[L / 2 - 1] + ratings[L / 2]) / 2
      : 0;
}
const MoreComparison = ({ user1, user2, user1Status, user2Status }) => {
  const stats1 = {
    oneShot: 0,
    oneShotRate: 0,
    avgAttempts: 0,
    uniqueTags: 0,
    avgSolved: 0,
    medianSolved: 0,
  };
  const stats2 = {
    oneShot: 0,
    oneShotRate: 0,
    avgAttempts: 0,
    uniqueTags: 0,
    avgSolved: 0,
    medianSolved: 0,
  };
  computeStats(user1Status, stats1);
  computeStats(user2Status, stats2);
  return (
    <div className="hero-stat-container">
      <HeroComparisonCard
        title={"Solved with One Submission"}
        user1={user1}
        user2={user2}
        data1={stats1.oneShot}
        data2={stats2.oneShot}
        compVal={
          stats1.oneShot > stats2.oneShot
            ? -1
            : stats1.oneShot === stats2.oneShot
              ? 0
              : 1
        }
      />
      <HeroComparisonCard
        title={"One Shot Solve Rate"}
        user1={user1}
        user2={user2}
        data1={`${stats1.oneShotRate} %`}
        data2={`${stats2.oneShotRate} %`}
        compVal={
          stats1.oneShotRate > stats2.oneShotRate
            ? -1
            : stats1.oneShotRate === stats2.oneShotRate
              ? 0
              : 1
        }
      />
      <HeroComparisonCard
        title={"Average Attempts to Solve"}
        user1={user1}
        user2={user2}
        data1={stats1.avgAttempts}
        data2={stats2.avgAttempts}
        compVal={
          stats1.avgAttempts === stats2.avgAttempts
            ? 0
            : stats1.avgAttempts > stats2.avgAttempts
              ? -1
              : 1
        }
      />
      <HeroComparisonCard
        title={"Unique Tags Solved"}
        user1={user1}
        user2={user2}
        data1={stats1.uniqueTags}
        data2={stats2.uniqueTags}
        compVal={
          stats1.uniqueTags > stats2.uniqueTags
            ? -1
            : stats1.uniqueTags === stats2.uniqueTags
              ? 0
              : 1
        }
      />
      <HeroComparisonCard
        title={"Average Solved Rating"}
        user1={user1}
        user2={user2}
        data1={stats1.avgSolved}
        data2={stats2.avgSolved}
        compVal={
          stats1.avgSolved > stats2.avgSolved
            ? -1
            : stats1.avgSolved === stats2.avgSolved
              ? 0
              : 1
        }
      />
      <HeroComparisonCard
        title={"Median Solved Rating"}
        user1={user1}
        user2={user2}
        data1={stats1.medianSolved}
        data2={stats2.medianSolved}
        compVal={
          stats1.medianSolved > stats2.medianSolved
            ? -1
            : stats1.medianSolved === stats2.medianSolved
              ? 0
              : 1
        }
      />
    </div>
  );
};
export default MoreComparison;
