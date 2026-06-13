const StrongestWeakest = ({ data }) => {
  let mp = {};
  data.forEach(({ problem, verdict }) => {
    if (verdict == "OK" && problem.rating) {
      problem.tags.forEach((tag) => {
        (mp[tag] ??= new Set()).add({
          id: `${problem.contestId}-${problem.index}`,
          rating: problem.rating,
        });
      });
    }
  });
  let avgRatingArr = [];
  for (const [name, value] of Object.entries(mp)) {
    if (value.size >= 10) {
      let sum = 0;
      for (const x of value) {
        sum += x.rating;
      }
      avgRatingArr.push({
        name,
        avg: (sum / value.size).toFixed(2),
      });
    }
  }
  avgRatingArr.sort((a, b) => b.avg - a.avg);
  let strong = [];
  let weak = [];
  let i = 0,
    j = avgRatingArr.length - 1;
  while (i < 3 && i < j) {
    strong.push(avgRatingArr[i++]);
    if (i < j) weak.push(avgRatingArr[j--]);
  }
  return (
    <>
      <div className="stat-big-container">
        <div>
          <h4 className="green-font">Strong Topics</h4>

          {strong.map(({ name, avg }, index) => (
            <div key={name}>
              <span>
                {index + 1}. {name} ( avg. rating: {avg} )
              </span>
              <br />
            </div>
          ))}
        </div>
        <div>
          <h4 className="red-font">Weak Topics</h4>

          {weak.map(({ name, avg }, index) => (
            <div key={name}>
              <span>
                {index + 1}. {name} ( avg. rating: {avg} )
              </span>
              <br />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default StrongestWeakest;
