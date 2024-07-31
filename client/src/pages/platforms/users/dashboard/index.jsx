import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBView,
  MDBBtn,
  MDBIcon,
  MDBBadge,
  MDBCardBody,
  MDBDatePicker,
} from "mdbreact";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { RESET, USERS } from "../../../../services/redux/slices/statistics";
import moment from "moment";
import formatCurrency from "../../../../services/utilities/formatCurrency";

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        barPercentage: 1,
        gridLines: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          fontColor: "#7e8591",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          beginAtZero: true,
          min: 0,
          fontColor: "#7e8591",
        },
      },
    ],
  },
  legend: {
    labels: {
      fontColor: "#7e8591",
      fontSize: 16,
    },
  },
};
export default function Dashboard() {
  const { token, auth } = useSelector(({ auth }) => auth),
    { collections } = useSelector(({ statistics }) => statistics),
    [stat, setStat] = useState({}),
    [date, setDate] = useState(""),
    [to, setTo] = useState(""),
    dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      var key = {
        user: `{"$eq": "${auth._id}"}`,
      };
      if (date) {
        key.start = `{"$gte": "${date}", "$lte":  "${to}"}`;
      }
      dispatch(
        USERS({
          token,
          key,
        })
      );
    }

    return () => {
      dispatch(RESET());
    };
  }, [token, auth, dispatch, date, to]);

  useEffect(() => {
    if (collections.labels) {
      const bgColors = [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ];
      const bColors = [
        "rgba(255,99,132,1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ];
      var bg = [];
      var bc = [];
      collections.labels.forEach(() => {
        const i = Math.floor(Math.random() * 4);
        bg.push(bgColors[i]);
        bc.push(bColors[i]);
      });
      var budgets = [...collections.budgets];
      var expenses = [...collections.expenses];
      const barChartData = {
        labels: collections.labels,
        datasets: [
          {
            label: "budgets",
            data: budgets,
            backgroundColor: bg,
            borderColor: bc,
            borderWidth: 1,
          },
          {
            label: "expenses",
            data: expenses,

            backgroundColor: bg,
            borderColor: bc,
            borderWidth: 1,
          },
        ],
      };
      setStat(barChartData);
    }
  }, [collections]);

  const handleTotalSavings = () => {
    let increase = 0;
    collections?.savings?.forEach(item => {
      var a = moment(item.start);
      var b = moment(new Date());
      const year = b.diff(a, item.isMonthly ? "months" : "years");
      increase += (item.increase / 100) * year * item.balance;
    });
    return formatCurrency(increase);
  };
  return (
    <MDBContainer fluid id="v6" className="mb-5">
      <section className="mb-4">
        <MDBRow>
          <MDBCol md="4" className="mb-4 mb-r">
            <MDBCard>
              <MDBRow className="mt-3">
                <MDBCol md="5" size="5" className="text-left pl-4">
                  <MDBBtn
                    tag="a"
                    floating
                    size="lg"
                    color="success"
                    className="ml-4"
                    style={{ padding: 0 }}
                  >
                    <MDBIcon icon="dollar-sign" size="2x" />
                  </MDBBtn>
                </MDBCol>
                <MDBCol md="7" col="7" className="text-right pr-5">
                  <h5 className="ml-4 mt-4 mb-2 font-weight-bold text-success">
                    <MDBIcon icon="angle-double-up" />
                    {formatCurrency(collections.income)}
                  </h5>
                  <p className="font-small grey-text">Total Income</p>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>

          <MDBCol md="4" className="mb-4 mb-r">
            <MDBCard>
              <MDBRow className="mt-3">
                <MDBCol md="5" col="5" className="text-left pl-4">
                  <MDBBtn
                    tag="a"
                    floating
                    size="lg"
                    color="danger"
                    className="ml-4"
                    style={{ padding: 0 }}
                  >
                    <MDBIcon icon="money-bill-wave" size="2x" />
                  </MDBBtn>
                </MDBCol>
                <MDBCol md="7" col="7" className="text-right pr-5">
                  <h5 className="ml-4 mt-4 mb-2 font-weight-bold text-danger">
                    <MDBIcon icon="angle-double-down" />
                    {formatCurrency(collections.totalExpenses)}
                  </h5>
                  <p className="font-small grey-text">Expenses</p>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
          <MDBCol md="4" className="mb-4 mb-r">
            <MDBCard>
              <MDBRow className="mt-3">
                <MDBCol md="5" col="5" className="text-left pl-4">
                  <MDBBtn
                    tag="a"
                    floating
                    size="lg"
                    color="info"
                    className="ml-4"
                    style={{ padding: 0 }}
                  >
                    <MDBIcon icon="file-invoice-dollar" size="2x" />
                  </MDBBtn>
                </MDBCol>
                <MDBCol md="7" col="7" className="text-right pr-5">
                  <h5 className="ml-4 mt-4 mb-2 font-weight-bold text-success">
                    <MDBIcon icon="angle-double-up" />
                    {handleTotalSavings()}
                  </h5>
                  <p className="font-small grey-text">Savings</p>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </section>
      <section className="mb-5">
        <MDBCard cascade narrow>
          <MDBRow>
            <MDBCol md="12" className="mr-0">
              <MDBCardBody cascade className="pb-3">
                <MDBRow className="pt-3 card-body">
                  <MDBCol md="12">
                    <h5>
                      <MDBBadge className="big-badge light-blue lighten-1">
                        Filter
                      </MDBBadge>
                    </h5>
                    <br />
                    <div className="mb-1">
                      <MDBRow>
                        <MDBCol size="6">
                          <small className="grey-text">from:</small>
                          <MDBDatePicker
                            getValue={e => {
                              setDate(new Date(e).toISOString().split("T")[0]);
                            }}
                            className="my-0 d-inline ml-3"
                          />
                        </MDBCol>
                        <MDBCol size="6">
                          <small className="grey-text">to:</small>
                          <MDBDatePicker
                            getValue={e => {
                              setTo(new Date(e).toISOString().split("T")[0]);
                            }}
                            className="my-0 d-inline ml-3"
                          />
                        </MDBCol>
                      </MDBRow>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
          <MDBCol md="12">
            <MDBView cascade className="gradient-card-header white ">
              <Bar
                className="overflow-scroll"
                data={stat}
                options={barChartOptions}
                height={150}
              />
            </MDBView>
          </MDBCol>
        </MDBCard>
      </section>
    </MDBContainer>
  );
}
