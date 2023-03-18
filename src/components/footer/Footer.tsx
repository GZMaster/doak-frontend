import "./Footer.scss";
const Footer = () => {
  return (
    <footer className="Footer">
      <div className="F_text">
        <p>
          Copyright © {new Date().getFullYear()} IntricateDesignSpaces All
          rights reserved.
        </p>
        <p>
          Designed by <span className="F_Team">Retro Developers</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
