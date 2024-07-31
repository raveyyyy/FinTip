import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import users from "./slices/users";
import roles from "./slices/roles";
import budgets from "./slices/budgets";
import savings from "./slices/savings";
import investments from "./slices/investments";
import goals from "./slices/goals";
import expenses from "./slices/expenses";
import statistics from "./slices/statistics";
import chats from "./slices/chats";

const store = configureStore({
  reducer: {
    auth,
    users,
    roles,
    budgets,
    savings,
    investments,
    goals,
    expenses,
    statistics,
    chats,
  },
});

export default store;
