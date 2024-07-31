import React, { useState, useEffect } from "react";
import {
  MDBSideNavLink,
  MDBSideNavCat,
  MDBSideNavNav,
  MDBSideNav,
  MDBIcon,
} from "mdbreact";
import ADMINISTRATOR from "../../pages/platforms/administrator/sidebar";
import USER from "../../pages/platforms/users/sidebar";
import VIP from "../../pages/platforms/users/sidebarVip";
import { useSelector } from "react-redux";
import { fullName } from "../../services/utilities";

export default function SideNavigation({
  triggerOpening,
  breakWidth,
  onLinkClick,
}) {
  const [links, setLinks] = useState([]),
    { role, auth } = useSelector(({ auth }) => auth);

  useEffect(() => {
    if (role.name) {
      const collection = {
        ADMINISTRATOR,
        USER,
        VIP,
      };

      setLinks(collection[role.name] || []);
    }
  }, [role]);

  const handleLinks = () => {
    if (links.length > 0) {
      return links?.map(({ path, name, icon, children }, index) =>
        path ? (
          <MDBSideNavLink
            key={`sidebar-${index}`}
            to={path}
            topLevel
            onClick={onLinkClick}
          >
            <MDBIcon icon={`${icon} mr-2`} />
            {name}
          </MDBSideNavLink>
        ) : (
          <MDBSideNavCat
            id={`${name}-cat`}
            name={name}
            key={`sidebar-${index}`}
            icon={icon}
          >
            {children.map((child, cIndex) => (
              <MDBSideNavLink
                key={`sidebar-${index}-${cIndex}`}
                to={child.path}
                onClick={onLinkClick}
              >
                {child.name}
              </MDBSideNavLink>
            ))}
          </MDBSideNavCat>
        )
      );
    } else {
      return (
        <MDBSideNavLink to="/" topLevel onClick={onLinkClick}>
          <MDBIcon icon="home mr-2" />
          Home
        </MDBSideNavLink>
      );
    }
  };

  return (
    <div className="white-skin">
      <MDBSideNav
        // logo="https://mdbootstrap.com/img/Marketing/general/logo/medium/mdb-react.png"
        bg="https://mdbootstrap.com/img/Photos/Others/sidenav3.jpg"
        mask="strong"
        href="/dashboard"
        fixed
        breakWidth={breakWidth}
        triggerOpening={triggerOpening}
        style={{ transition: "padding-left .3s" }}
      >
        <h3 className="text-center text-dark font-weight-bold pt-2">
          Welcome {role.name}!
        </h3>
        <div className="d-flex align-items-center justify-content-center">
          <span className="text-center text-info font-weight-bold pt-">
            {fullName(auth.fullName)}
          </span>
        </div>
        <hr />
        <MDBSideNavNav>{handleLinks()}</MDBSideNavNav>
        {role.name === "USER" && (
          <p className="text-center text-success  p-5">
            Avail VIP contact admin@gmail.com
          </p>
        )}
      </MDBSideNav>
    </div>
  );
}
