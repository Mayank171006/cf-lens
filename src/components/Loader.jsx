const Loader = () => {
  return (
    <div className="Home-container">
      <div
        className="spinner-border text-info"
        style={{ width: "100px", height: "100px" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
export default Loader;
