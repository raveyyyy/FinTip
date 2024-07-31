import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBIcon,
  MDBBtn,
  MDBView,
} from "mdbreact";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { ADMIN, RESET } from "../../../../services/redux/slices/statistics";

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
    dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(
        ADMIN({
          token,
        })
      );
    }

    return () => {
      dispatch(RESET());
    };
  }, [token, auth, dispatch]);

  useEffect(() => {
    if (collections.barData) {
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
      collections.dates.forEach(() => {
        const i = Math.floor(Math.random() * 4);
        bg.push(bgColors[i]);
        bc.push(bColors[i]);
      });
      var barData = [...collections.barData];
      const barChartData = {
        labels: collections.dates,
        datasets: [
          {
            label: "Data of registered user every month",
            data: barData,
            backgroundColor: bg,
            borderColor: bc,
            borderWidth: 1,
          },
        ],
      };
      setStat(barChartData);
    }
  }, [collections]);
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
                    color="warning"
                    className="ml-4"
                    style={{ padding: 0 }}
                  >
                    <MDBIcon icon="user" size="2x" />
                  </MDBBtn>
                </MDBCol>
                <MDBCol md="7" col="7" className="text-right pr-5">
                  <h5 className="ml-4 mt-4 mb-2 font-weight-bold">
                    {collections.pending}
                  </h5>
                  <p className="font-small grey-text">Pending/Deleted Users</p>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>

          <MDBCol md="4" className="mb-4 mb-r">
            <MDBCard>
              <MDBRow className="mt-3">
                <MDBCol md="5" size="5" className="text-left pl-4">
                  <MDBBtn
                    tag="a"
                    floating
                    size="lg"
                    color="primary"
                    className="ml-4"
                    style={{ padding: 0 }}
                  >
                    <MDBIcon icon="user" size="2x" />
                  </MDBBtn>
                </MDBCol>
                <MDBCol md="7" col="7" className="text-right pr-5">
                  <h5 className="ml-4 mt-4 mb-2 font-weight-bold">
                    {collections.total}
                  </h5>
                  <p className="font-small grey-text">Total Users</p>
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
                    color="warning"
                    className="ml-4"
                    style={{ padding: 0 }}
                  >
                    <MDBIcon icon="user-nurse" size="2x" />
                  </MDBBtn>
                </MDBCol>
                <MDBCol md="7" col="7" className="text-right pr-5">
                  <h5 className="ml-4 mt-4 mb-2 font-weight-bold">
                    {collections.new}
                  </h5>
                  <p className="font-small grey-text">New Users</p>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </section>
      <section className="mb-5">
        <MDBCard cascade narrow>
          <MDBRow>
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
          </MDBRow>
        </MDBCard>
      </section>
    </MDBContainer>
  );
}
