const isMobile = window.innerWidth <= 768;

const CustomLegend = ({ payload }) => (
  <div
    style={{
      maxHeight: isMobile ? "200px" : "300px",
      overflowY: "auto",
      width: "180px",
      paddingRight: "5px",
    }}
  >
    {payload.map((entry, index) => (
      <div
        key={index}
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "4px",
        }}
      >
        <div
          style={{
            width: "12px",
            height: "12px",
            backgroundColor: entry.color,
            marginRight: "8px",
          }}
        />
        {entry.value}
      </div>
    ))}
  </div>
);
export default CustomLegend;
