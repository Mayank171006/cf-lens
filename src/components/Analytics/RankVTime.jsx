import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
const isMobile = window.innerWidth <= 768;
const RankVTime = ({ data }) => {
  const chartData = data.map((c) => ({
    time: c.ratingUpdateTimeSeconds * 1000,
    rank: c.rank,
    rating: c.newRating,
    id: c.contestId,
    name: c.contestName,
  }));
  return (
    <LineChart
      data={chartData}
      width={isMobile ? "80vw" : "768px"}
      height="90%"
    >
      <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
      <XAxis
        dataKey="time"
        type="number"
        domain={["dataMin", "dataMax+86400000"]}
        tickCount={20}
        angle={-30}
        textAnchor="end"
        height={70}
        tick={{ fontSize: isMobile ? 10 : 15 }}
        tickFormatter={(v) =>
          new Date(v).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })
        }
      />
      <YAxis dataKey="rank" tick={{ fontSize: isMobile ? 10 : 15 }} />
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
              <div>Contest ID: {point.id}</div>
              <div>Rank: {point.rank} </div>
              <div>Rating: {point.rating}</div>
              <div>Date: {new Date(point.time).toLocaleDateString()}</div>
            </div>
          );
        }}
      />
      <Line dataKey="rank" type="linear" dot={false} />
    </LineChart>
  );
};
export default RankVTime;
