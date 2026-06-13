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
const SolvedByRating = ({ data }) => {
  let mp = {};
  data.forEach(({ problem, verdict }) => {
    if (verdict === "OK" && problem.rating)
      mp[problem.rating] = (mp[problem.rating] || 0) + 1;
  });
  let barDataArr = Object.entries(mp).map(([name, value]) => ({
    name,
    count: value,
  }));

  return (
    <BarChart
      data={barDataArr}
      width={isMobile ? "80vw" : "768px"}
      height="90%"
    >
      <CartesianGrid />
      <XAxis type="category" dataKey="name" tick={{ fontSize: 11 }} />
      <YAxis type="number" />

      <Tooltip />
      <Bar dataKey="count">
        {barDataArr.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % 50]}></Cell>
        ))}
      </Bar>
    </BarChart>
  );
};
export default SolvedByRating;
