import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import COLORS from "../../constants/Colors";
import CustomLegend from "../CustomLegend";
const isMobile = window.innerWidth <= 768;

const SolvedByTags = ({ data }) => {
  let mp = {};
  data.forEach(({ problem, verdict }) => {
    if (verdict === "OK")
      problem.tags.forEach((tag) => {
        (mp[tag] ??= new Set()).add(`${problem.contestId}-${problem.index}`);
      });
  });
  const pieData = Object.entries(mp).map(([name, value]) => ({
    name,
    value: value.size,
  }));
  return (
    <PieChart width={isMobile ? 300 : 600} height={isMobile ? 300 : 500}>
      <Pie
        data={pieData}
        dataKey="value"
        nameKey="name"
        innerRadius={isMobile ? 25 : 70}
        cx="45%"
        cy="45%"
      >
        {pieData.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % 50]} />
        ))}
      </Pie>
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
              <div>Count: {point.value}</div>
            </div>
          );
        }}
      />
      <Legend
        layout="vertical"
        align="right"
        verticalAlign="top"
        content={<CustomLegend />}
      />
    </PieChart>
  );
};
export default SolvedByTags;
