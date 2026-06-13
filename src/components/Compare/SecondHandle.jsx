import { useRef } from "react";

const SecondHandle = ({ setHandle2 }) => {
  const user2 = useRef("");
  return (
    <form
      className="d-flex user-primary user-two-input"
      role="search"
      data-bs-theme="dark"
      onSubmit={(e) => {
        e.preventDefault();
        setHandle2(user2.current.value.trim());
      }}
    >
      <input
        className="form-control me-2"
        type="search"
        id="compare"
        placeholder="Enter 2nd User Handle"
        ref={user2}
      />

      <button className="btn btn-outline-success" type="submit">
        Compare
      </button>
    </form>
  );
};
export default SecondHandle;
