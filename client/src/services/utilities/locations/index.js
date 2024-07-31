const locations = location => {
  switch (location) {
    case "/dashboard":
      return "Dashboard";

    case "/roles":
      return "Listed Roles";

    case "/admin/users":
      return "Listed Users";

    case "/profile":
      return "Your Profile";

    case "/profile/update":
      return "Update Profile";

    case "/user/budgets":
      return "Your Budgets";

    case "/user/expenses":
      return "Your Expenses";

    case "/user/investments":
      return "Your Investments";

    case "/user/goals":
      return "Your Financial Goal";

    case "/user/savings":
      return "Your Savings";

    case "/user/bot":
      return "Financial bot";

    default:
      return "Looks like you're lost.";
  }
};

export default locations;
