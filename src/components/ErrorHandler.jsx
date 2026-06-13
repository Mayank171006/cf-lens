const ErrorHandler = ({ error }) => {
  if (error === "api_error") {
    return (
      <div className="Home-container">
        <h1 className="white-font">Codeforces API Error</h1>
      </div>
    );
  } else if (error === "invalid_user") {
    return (
      <div className="Home-container">
        <h1 className="white-font">Invalid User Handle.. Please Enter Again</h1>
      </div>
    );
  } else {
    return (
      <div className="Home-container">
        <h1 className="white-font">Unknown Error</h1>
      </div>
    );
  }
};
export default ErrorHandler;
