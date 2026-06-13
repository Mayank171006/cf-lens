const Footer = () => {
  return (
    <div className="footer">
      <footer>
        <p className="text-center footer-font">
          Codeforces Analytics Dashboard
        </p>
        <hr />
        <p className="text-center footer-font">Built by Mayank Kumar</p>
        <p className="text-center footer-font">Powered by the Codeforces API</p>
        <hr />
        <p className="text-center footer-font">
          <a href="https://github.com/Mayank171006" className="foot-anchor">
            Github
          </a>
          <a
            href="https://codeforces.com/profile/Mayank_kumar1710"
            className="foot-anchor"
          >
            Codeforces
          </a>
          <a
            href="https://www.linkedin.com/in/mayank-kumar-b0001831a/"
            className="foot-anchor"
          >
            LinkedIn
          </a>
        </p>
      </footer>
    </div>
  );
};
export default Footer;
