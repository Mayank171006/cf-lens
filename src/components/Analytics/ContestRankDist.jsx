import { BarChart, CartesianGrid, Tooltip, XAxis, YAxis, Bar } from "recharts";

const isMobile = window.innerWidth <= 768;
const ContestRankDist = ({ data }) => {
  let rankDistArr = [
    {
      range: "1-100",
      contests: 0,
    },
    {
      range: "101-500",
      contests: 0,
    },
    {
      range: "501-1000",
      contests: 0,
    },
    {
      range: "1001-2000",
      contests: 0,
    },
    {
      range: "2001-5000",
      contests: 0,
    },
    {
      range: "5001-10000",
      contests: 0,
    },
    {
      range: "10000+",
      contests: 0,
    },
  ];
  const limits = [100, 500, 1000, 2000, 5000, 10000];
  data.forEach(({ rank }) => {
    let i = 0;
    while (i < limits.length && rank > limits[i]) i++;
    rankDistArr[i].contests++;
  });

  return (
    <BarChart
      data={rankDistArr}
      width={isMobile ? "80vw" : "768px"}
      height="90%"
      layout="vertical"
    >
      <CartesianGrid />
      <XAxis type="number" />
      <YAxis type="category" dataKey="range" tick={{ fontSize: 11 }} />
      <Tooltip />
      <Bar dataKey="contests" fill="#381d92"></Bar>
    </BarChart>
  );
};
export default ContestRankDist;
