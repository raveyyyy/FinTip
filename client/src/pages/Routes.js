import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./notFound";

import ADMINISTRATOR from "./platforms/administrator/routes";
import USER from "./platforms/users/routes";
import VIP from "./platforms/users/routesVip.js";

//global
import Profile from "../components/profile";
import ViewProfile from "../components/profile/view.jsx";
import { useSelector } from "react-redux";

export default function Routes() {
  const { role } = useSelector(({ auth }) => auth);

  const handleRoutes = () => {
    const collection = {
      ADMINISTRATOR,
      USER,
      VIP,
    };

    const routes = collection[role.name] || [];

    return routes.map(({ path, component }, index) => (
      <Route key={`route-${index}`} exact path={path} component={component} />
    ));
  };

  return (
    <Switch>
      {handleRoutes()}
      <Route path="/profile" exact component={ViewProfile} />
      <Route path="/profile/update" exact component={Profile} />

      <Route component={NotFound} />
    </Switch>
  );
}
