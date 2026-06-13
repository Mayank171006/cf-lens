import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import COLORS from "../../constants/Colors";
import CustomLegend from "../CustomLegend";
const isMobile = window.innerWidth <= 768;

const LanguagePie = ({ data }) => {
  const freq = {};
  data.forEach(({ programmingLanguage, verdict }) => {
    if (verdict === "OK")
      freq[programmingLanguage] = (freq[programmingLanguage] || 0) + 1;
  });

  const pieData = Object.entries(freq).map(([name, value]) => ({
    name,
    value,
  }));
  return (
    <PieChart width={isMobile ? 300 : 600} height={isMobile ? 300 : 500}>
      <Pie data={pieData} dataKey="value" nameKey="name" cx="45%" cy="45%">
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
              <div>Problems: {point.value}</div>
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
export default LanguagePie;
