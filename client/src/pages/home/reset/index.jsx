import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBContainer,
  MDBInput,
} from "mdbreact";
import React from "react";
import { FORGOTPASSWORD } from "../../../services/redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";

export default function ForgotPassword() {
  const { isSuccess, message } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();

    const { address } = e.target;

    dispatch(
      FORGOTPASSWORD({
        data: { email: address.value },
      })
    );
  };
  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center vh-100"
    >
      <MDBCard>
        <MDBCardHeader tag="h2">Forgot Password</MDBCardHeader>
        <MDBCardBody>
          {message && (
            <div
              className={`alert alert-${
                isSuccess ? "success" : "warning"
              } text-center`}
            >
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <MDBInput
              label="E-mail Address"
              type="email"
              icon="envelope"
              name="address"
              required
            />
            <MDBBtn className="w-100" type="submit">
              Send link
            </MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}
