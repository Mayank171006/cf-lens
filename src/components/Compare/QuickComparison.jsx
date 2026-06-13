import HeroComparisonCard from "./HeroComparisonCard";

function calculateStats(status, probSolved, accep, totSub, highestRated) {
  status.forEach(({ problem, verdict }) => {
    totSub.value++;
    if (verdict === "OK") {
      probSolved.add(`${problem.contestId}-${problem.index}`);
      accep.value++;
      if (problem.rating)
        highestRated.value = Math.max(highestRated.value, problem.rating);
    }
  });
}

const QuickComparison = ({
  user1status,
  user2status,
  user1info,
  user2info,
}) => {
  const user1 = user1info.handle;
  const user2 = user2info.handle;

  const user1Rating = user1info.rating;
  const user2Rating = user2info.rating;

  const user1MaxRating = user1info.maxRating;
  const user2MaxRating = user2info.maxRating;

  const user1MaxRank = user1info.maxRank;
  const user2MaxRank = user2info.maxRank;

  let problemsSolved1 = new Set();
  let problemsSolved2 = new Set();
  let accepSub1 = { value: 0 };
  let accepSub2 = { value: 0 };
  let highestRated1 = { value: 0 };
  let highestRated2 = { value: 0 };
  let totSub1 = { value: 0 };
  let totSub2 = { value: 0 };
  calculateStats(
    user1status,
    problemsSolved1,
    accepSub1,
    totSub1,
    highestRated1,
  );
  calculateStats(
    user2status,
    problemsSolved2,
    accepSub2,
    totSub2,
    highestRated2,
  );
  const accuracy1 =
    totSub1.value !== 0
      ? Number(((accepSub1.value / totSub1.value) * 100).toFixed(2))
      : 0;
  const accuracy2 =
    totSub2.value !== 0
      ? Number(((accepSub2.value / totSub2.value) * 100).toFixed(2))
      : 0;
  return (
    <div className="hero-stat-container">
      <HeroComparisonCard
        title={"Current Rating"}
        user1={user1}
        user2={user2}
        data1={user1Rating ? user1Rating : 0}
        data2={user2Rating ? user2Rating : 0}
        compVal={
          user1Rating > user2Rating ? -1 : user1Rating === user2Rating ? 0 : 1
        }
      />
      <HeroComparisonCard
        title={"Max Rating"}
        user1={user1}
        user2={user2}
        data1={user1MaxRating ? user1MaxRating : 0}
        data2={user2MaxRating ? user2MaxRating : 0}
        compVal={
          user1MaxRating > user2MaxRating
            ? -1
            : user1MaxRating === user2MaxRating
              ? 0
              : 1
        }
      />
      <HeroComparisonCard
        title={"Max Rank"}
        user1={user1}
        user2={user2}
        data1={user1MaxRank ? user1MaxRank : "unrated"}
        data2={user2MaxRank ? user2MaxRank : "unrated"}
        compVal={
          user1MaxRank === user2MaxRank
            ? 0
            : user1MaxRating > user2MaxRating
              ? -1
              : 1
        }
      />
      <HeroComparisonCard
        title={"Total Problems Solved"}
        user1={user1}
        user2={user2}
        data1={problemsSolved1.size}
        data2={problemsSolved2.size}
        compVal={
          problemsSolved1.size > problemsSolved2.size
            ? -1
            : problemsSolved1.size === problemsSolved2.size
              ? 0
              : 1
        }
      />
      <HeroComparisonCard
        title={"Highest Rated Solved"}
        user1={user1}
        user2={user2}
        data1={highestRated1.value}
        data2={highestRated2.value}
        compVal={
          highestRated1.value > highestRated2.value
            ? -1
            : highestRated1.value === highestRated2.value
              ? 0
              : 1
        }
      />
      <HeroComparisonCard
        title={"Accuracy %"}
        user1={user1}
        user2={user2}
        data1={`${accuracy1} %`}
        data2={`${accuracy2} %`}
        compVal={accuracy1 > accuracy2 ? -1 : accuracy1 === accuracy2 ? 0 : 1}
      />
    </div>
  );
};
export default QuickComparison;
