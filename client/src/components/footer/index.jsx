import React from "react";
import { MDBFooter } from "mdbreact";

export default function Copyrights(props) {
  const date = new Date().getFullYear();
  return (
    <MDBFooter
      className={props.className}
      style={{ ...props.style, zIndex: 2 }}
    >
      <p className="footer-copyright mb-0 py-3 text-center">
        &copy; {date} Copyright:&nbsp;
        <a href="https://www.FinTip.online"> FinTip.online </a>
      </p>
    </MDBFooter>
  );
}
