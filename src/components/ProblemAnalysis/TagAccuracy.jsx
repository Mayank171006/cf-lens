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
const TagAccuracy = ({ data }) => {
  let acc = {};
  let cnt = {};
  data.forEach(({ problem, verdict }) => {
    problem.tags.forEach((tag) => {
      cnt[tag] = (cnt[tag] || 0) + 1;
      if (verdict === "OK") acc[tag] = (acc[tag] || 0) + 1;
    });
  });
  let barDataArr = Object.entries(acc).map(([name, value]) => ({
    name,
    accuracy: ((value / cnt[name]) * 100).toFixed(2),
  }));
  barDataArr.sort((a, b) => b.accuracy - a.accuracy);

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
      <Bar dataKey="accuracy">
        {barDataArr.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % 50]}></Cell>
        ))}
      </Bar>
    </BarChart>
  );
};
export default TagAccuracy;
