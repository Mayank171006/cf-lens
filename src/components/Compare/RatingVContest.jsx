import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
const isMobile = window.innerWidth <= 768;

const RatingVContest = ({ user1, user2, user1Rating, user2Rating }) => {
  const chartData = [];
  const L = Math.max(user1Rating.length, user2Rating.length);
  for (let i = 0; i < L; i++) {
    chartData.push({
      contest: i + 1,
      user1Rating: user1Rating[i]?.newRating,
      user2Rating: user2Rating[i]?.newRating,
    });
  }
  return (
    <LineChart
      data={chartData}
      width={isMobile ? "80vw" : "768px"}
      height={isMobile ? "75%" : "90%"}
    >
      <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
      <XAxis
        dataKey="contest"
        type="number"
        height={70}
        tick={{ fontSize: isMobile ? 10 : 15 }}
        label={{
          value: "Contest Number",
          position: "center",
        }}
      />
      <YAxis />
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
                <strong>Contest No: {point.contest}</strong>
              </div>
              <div>
                {user1}: {point.user1Rating}
              </div>
              <div>
                {user2}: {point.user2Rating}
              </div>
            </div>
          );
        }}
      />
      <Legend align="center" />
      <Line
        dataKey="user1Rating"
        type="linear"
        stroke="#0d6efd"
        dot={false}
        name={user1}
      />
      <Line
        dataKey="user2Rating"
        type="linear"
        stroke="#ff723e"
        dot={false}
        name={user2}
      />
    </LineChart>
  );
};
export default RatingVContest;
