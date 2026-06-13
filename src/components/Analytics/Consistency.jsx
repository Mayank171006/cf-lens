const Consistency = ({ data }) => {
  let cur = 0;
  let longestStreak = 0;
  let positiveDeltaCount = 0;
  let sumDelta = 0;
  data.forEach(({ newRating, oldRating }) => {
    if (newRating - oldRating >= 0) {
      cur++;
      positiveDeltaCount++;
    } else {
      longestStreak = Math.max(longestStreak, cur);
      cur = 0;
    }
    sumDelta += newRating - oldRating;
  });
  let L = data.length;
  longestStreak = Math.max(longestStreak, cur);
  let positivePercentage =
    L == 0 ? "undefined" : Number((positiveDeltaCount / L) * 100).toFixed(2);
  let negativePercentage =
    L == 0 ? "undefined" : Number(100 - positivePercentage).toFixed(2);
  let averageRatingChange = L == 0 ? 0 : (sumDelta / L).toFixed(2);
  return (
    <>
      <h3>
        Total Contests Participated: <span className="blue-font">{L}</span>
      </h3>
      <h3>
        Average Rating Change:{" "}
        {averageRatingChange > 0 ? (
          <span className="green-font">+{averageRatingChange}</span>
        ) : (
          <span className="red-font">{averageRatingChange}</span>
        )}{" "}
      </h3>
      <h3>
        Positive Delta %:{" "}
        <span className="green-font">{positivePercentage}</span>
      </h3>
      <h3>
        Negative Delta %: <span className="red-font">{negativePercentage}</span>
      </h3>
      <h3>
        Longest Improvement Streak:{" "}
        <span className="blue-font">{longestStreak}</span>
      </h3>
    </>
  );
};
export default Consistency;
