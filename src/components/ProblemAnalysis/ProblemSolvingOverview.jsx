const ProblemSolvingOverview = ({ data }) => {
  let accep = new Set();
  let tried = new Set();
  let tags = new Set();
  data.forEach(({ problem, verdict }) => {
    const probId = `${problem.contestId}-${problem.index}`;
    tried.add(probId);
    if (verdict === "OK") {
      accep.add(probId);
      problem.tags.forEach((tag) => {
        tags.add(tag);
      });
    }
  });
  return (
    <>
      <span>
        <b>Total Problems Attempted: </b>
        <b className="blue-font">{tried.size}</b>
      </span>
      <br />
      <span>
        <b>Total Problems Solved: </b>
        <b className="green-font">{accep.size}</b>
      </span>
      <br />
      <span>
        <b>Total Problems Unsolved: </b>
        <b className="red-font">{tried.size - accep.size}</b>
      </span>
      <br />
      <span>
        <b>Solve Rate: </b>
        <b className="blue-font">
          {tried.size == 0 ? 0 : ((accep.size / tried.size) * 100).toFixed(2)}
          %{" "}
        </b>
      </span>
      <br />
      <span>
        <b>Unique Tags Solved: </b>
        <b className="blue-font">{tags.size}</b>
      </span>
    </>
  );
};
export default ProblemSolvingOverview;
