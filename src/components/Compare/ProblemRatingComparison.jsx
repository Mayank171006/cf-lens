import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const isMobile = window.innerWidth <= 768;
function computeProblemsByRating(status) {
  let setArr = [];
  let ratingArr = [1200, 1400, 1600, 1900, 2100, 2300, 2600];
  for (let i = 0; i < 8; i++) setArr.push(new Set());
  status.forEach(({ problem, verdict }) => {
    if (verdict === "OK" && problem.rating) {
      let i = 0;
      while (ratingArr[i] <= problem.rating) i++;
      setArr[i].add(`${problem.contestId}-${problem.index}`);
    }
  });
  const data = {
    "< 1200": setArr[0].size,
    "1200-1399": setArr[1].size,
    "1400-1599": setArr[2].size,
    "1600-1899": setArr[3].size,
    "1900-2099": setArr[4].size,
    "2100-2299": setArr[5].size,
    "2300-2599": setArr[6].size,
    "2600+": setArr[7].size,
  };
  return data;
}
const ProblemRatingComparison = ({
  user1,
  user2,
  user1Status,
  user2Status,
}) => {
  const data1 = computeProblemsByRating(user1Status);
  const data2 = computeProblemsByRating(user2Status);

  const chartData = [];
  for (const name of Object.keys(data1)) {
    chartData.push({
      name,
      user1Count: data1[name],
      user2Count: data2[name],
    });
  }
  return (
    <BarChart
      data={chartData}
      width={isMobile ? "80vw" : "768px"}
      height={isMobile ? "70%" : "90%"}
    >
      <CartesianGrid />
      <YAxis type="number" />
      <XAxis type="category" dataKey="name" tick={{ fontSize: 10 }} />
      <Tooltip
        content={({ active, payload }) => {
          if (!active || !payload?.length) return null;

          const point = payload[0].payload;

          return (
            <div
              className="tool-tip"
              style={{
                fontSize: isMobile ? "8px" : "14px",
              }}
            >
              <div>
                <strong>{point.name}</strong>
              </div>
              <div>
                {user1}: {point.user1Count}
              </div>
              <div>
                {user2}: {point.user2Count}
              </div>
            </div>
          );
        }}
      />
      <Bar dataKey="user1Count" fill="#0d6efd" name={user1}></Bar>
      <Bar dataKey="user2Count" fill="#ff723e" name={user2}></Bar>
      <Legend />
    </BarChart>
  );
};
export default ProblemRatingComparison;
