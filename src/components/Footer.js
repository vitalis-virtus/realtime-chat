import React from "react";
import { BsGithub, BsLinkedin, BsFacebook } from "react-icons/bs";

function Footer() {
  // return <></>;
  return (
    <footer className="footer">
      <ul className="social">
        <li className="social__item">
          <a
            className="social__link"
            target="blank"
            href="https://github.com/vitalis-virtus"
          >
            <BsGithub className="social__svg" />
          </a>
        </li>
        <li className="social__item">
          <a
            className="social__link"
            target="blank"
            href="https://www.linkedin.com/in/vitalii-shaiuk/"
          >
            <BsLinkedin className="social__svg" />
          </a>
        </li>
        <li className="social__item">
          <a
            className="social__link"
            target="blank"
            href="https://www.facebook.com/vshaiuk"
          >
            <BsFacebook className="social__svg" />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
