const isMobile = window.innerWidth <= 768;
const fontClass = isMobile ? "fs-6" : "fs-4";
const HeroComparisonCard = ({ title, user1, user2, data1, data2, compVal }) => {
  return (
    <div className="hero-card">
      <h2 className="mb-2">
        <b>{title}</b>
      </h2>
      <div className="comparison-container">
        <div className={compVal === -1 ? "green-font" : "blue-font"}>
          <span className={fontClass}>
            <strong>{user1}</strong>
          </span>
          <br />
          <center>
            <span className={fontClass}>{data1}</span>
          </center>
        </div>
        <div className={compVal === 1 ? "green-font" : "blue-font"}>
          <span className={fontClass}>
            <strong>{user2}</strong>
          </span>
          <br />
          <center>
            <span className={fontClass}>{data2}</span>
          </center>
        </div>
      </div>
    </div>
  );
};
export default HeroComparisonCard;
