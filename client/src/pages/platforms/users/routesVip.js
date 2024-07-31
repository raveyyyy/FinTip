import Dashboard from "./dashboard";
import Budgets from "./budgets";
import Savings from "./savings";
import Investments from "./investments";
import Goals from "./goals";
import Expenses from "./expenses";
import Bots from "./bots";

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
    path: "/user/savings",
    component: Savings,
  },
  {
    path: "/user/investments",
    component: Investments,
  },
  {
    path: "/user/goals",
    component: Goals,
  },
  {
    path: "/user/expenses",
    component: Expenses,
  },
  {
    path: "/user/bot",
    component: Bots,
  },
];

export default routes;
