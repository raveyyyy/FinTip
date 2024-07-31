import Dashboard from "./dashboard";
import Budgets from "./budgets";
import Expenses from "./expenses";

const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/user/budgets",
    component: Budgets,
  },
  {
    path: "/user/expenses",
    component: Expenses,
  },
];

export default routes;
