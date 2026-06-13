import { useRef } from "react";
import { Link } from "react-router-dom";

const NavBar = ({ setHandle }) => {
  const user1 = useRef("");
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <div className="app-name-container">
          <img src="Logo.png" className="logo-image"></img>
          <h1 className="app-name">CF Lens</h1>
        </div>
        <div id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link nav-comp" to="/">
              <p className="nav-font">Home</p>
            </Link>
            <Link className="nav-link nav-comp" to="/analytics">
              <p className="nav-font">Analytics</p>
            </Link>
            <Link className="nav-link nav-comp" to="/problem_analysis">
              <p className="nav-font">Problem Analysis</p>
            </Link>
            <Link className="nav-link nav-comp" to="/compare">
              <p className="nav-font">Compare</p>
            </Link>
          </div>
        </div>
        <form
          className="d-flex user-primary"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            setHandle(user1.current.value);
          }}
        >
          <input
            className="form-control me-2"
            type="search"
            id="search"
            placeholder="User Handle"
            ref={user1}
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Analyze
          </button>
        </form>
      </div>
    </nav>
  );
};
export default NavBar;
