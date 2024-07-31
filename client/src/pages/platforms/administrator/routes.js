import Dashboard from "./dashboard";
import Budgets from "./financial of user/budgets";
import Users from "./users";

const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/admin/users",
    component: Users,
  },
  {
    path: "/budgets",
    component: Budgets,
  },
];

export default routes;
