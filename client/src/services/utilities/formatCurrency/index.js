const formatCurrency = num => {
  return num && num > 0
    ? num.toLocaleString("en-US", { style: "currency", currency: "PHP" })
    : "-";
};

export default formatCurrency;
