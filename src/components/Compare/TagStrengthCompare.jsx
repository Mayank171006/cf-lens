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
function ComputeAvgForUniqueTags(status) {
  let mp = {};
  let sum = {};
  status.forEach(({ problem, verdict }) => {
    if (verdict === "OK" && problem.rating) {
      problem.tags.forEach((tag) => {
        if (mp[tag]) {
          const L = mp[tag].size;
          mp[tag].add(`${problem.contestId}-${problem.index}`);
          if (L < mp[tag].size) sum[tag] += problem.rating;
        } else {
          mp[tag] = new Set();
          sum[tag] = 0;
          mp[tag].add(`${problem.contestId}-${problem.index}`);
          sum[tag] += problem.rating;
        }
      });
    }
  });
  let avg = {};
  for (const [name, value] of Object.entries(mp)) {
    if (value.size >= 5) {
      avg[name] = sum[name] / value.size;
    }
  }
  return avg;
}
const TagStrengthCompare = ({ user1, user2, user1Status, user2Status }) => {
  const avg1 = ComputeAvgForUniqueTags(user1Status);
  const avg2 = ComputeAvgForUniqueTags(user2Status);

  let chartData = [];

  for (const [name, value] of Object.entries(avg1)) {
    if (avg2[name] !== undefined) {
      chartData.push({
        name,
        user1avg: value,
        user2avg: avg2[name],
      });
    }
  }
  chartData.sort((a, b) => a.name.localeCompare(b.name));
  return (
    <BarChart
      data={chartData}
      width={isMobile ? "80vw" : "768px"}
      height={isMobile ? "70%" : "90%"}
      layout="vertical"
    >
      <CartesianGrid />
      <XAxis type="number" />
      <YAxis type="category" dataKey="name" tick={{ fontSize: 8 }} />
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
                <strong>Tag: {point.name}</strong>
              </div>
              <div>
                {user1}: {point.user1avg.toFixed(2)}
              </div>
              <div>
                {user2}: {point.user2avg.toFixed(2)}
              </div>
            </div>
          );
        }}
      />
      <Bar dataKey="user1avg" fill="#0d6efd" name={user1}></Bar>
      <Bar dataKey="user2avg" fill="#ff723e" name={user2}></Bar>
      <Legend />
    </BarChart>
  );
};
export default TagStrengthCompare;
