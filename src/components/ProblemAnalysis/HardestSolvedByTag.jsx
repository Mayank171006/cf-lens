import {
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  Cell,
} from "recharts";
import COLORS from "../../constants/Colors";
const isMobile = window.innerWidth <= 768;
const HardestSolvedPerTag = ({ data }) => {
  let mp = {};
  data.forEach(({ problem, verdict }) => {
    problem.tags.forEach((tag) => {
      if (verdict === "OK" && problem.rating)
        mp[tag] = Math.max(mp[tag] || 0, problem.rating);
    });
  });
  let barDataArr = Object.entries(mp).map(([name, value]) => ({
    name,
    rating: value,
  }));
  barDataArr.sort((a, b) => b.rating - a.rating);
  return (
    <BarChart
      data={barDataArr}
      width={isMobile ? "80vw" : "768px"}
      height="90%"
      layout="vertical"
    >
      <CartesianGrid />
      <XAxis type="number" />
      <YAxis type="category" dataKey="name" tick={{ fontSize: 8 }} />
      <Tooltip />
      <Bar dataKey="rating">
        {barDataArr.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % 50]}></Cell>
        ))}
      </Bar>
    </BarChart>
  );
};
export default HardestSolvedPerTag;
