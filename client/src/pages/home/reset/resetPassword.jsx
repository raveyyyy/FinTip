import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBContainer,
  MDBIcon,
  MDBInput,
} from "mdbreact";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CUSTOMALERT, UPDATE } from "../../../services/redux/slices/users";
import { useParams, useHistory } from "react-router";

export default function ResetPassword() {
  const [isLocked, setIsLocked] = useState({
      password: true,
      confirmPassword: true,
    }),
    { id, token } = useParams(),
    { message, isLoading, isSuccess } = useSelector(({ users }) => users),
    history = useHistory(),
    dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const { password, confirmPassword } = e.target;
    if (password.value === confirmPassword.value) {
      dispatch(UPDATE({ data: { password: password.value, _id: id }, token }));
      history.push("/");
    } else {
      dispatch(CUSTOMALERT("Passwords does not match."));
    }
  };

  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center vh-100"
    >
      <MDBCard>
        <MDBCardHeader tag="h2">Forgot Password</MDBCardHeader>
        <MDBCardBody>
          <form onSubmit={handleSubmit}>
            <MDBInput
              label="New Password"
              minLength={8}
              icon={isLocked.password ? "lock" : "unlock"}
              onIconMouseEnter={() =>
                setIsLocked({ ...isLocked, password: false })
              }
              onIconMouseLeave={() =>
                setIsLocked({ ...isLocked, password: true })
              }
              type={isLocked.password ? "password" : "text"}
              labelClass="dark-text"
              iconClass="dark-text"
              name="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              required
            />
            <MDBInput
              label="Confirm your password"
              minLength={8}
              icon={isLocked.confirmPassword ? "lock" : "unlock"}
              onIconMouseEnter={() =>
                setIsLocked({ ...isLocked, confirmPassword: false })
              }
              onIconMouseLeave={() =>
                setIsLocked({ ...isLocked, confirmPassword: true })
              }
              type={isLocked.confirmPassword ? "password" : "text"}
              labelClass="dark-text"
              iconClass="dark-text"
              name="confirmPassword"
              required
            />
            {message && (
              <div
                className={`alert alert-${
                  isSuccess ? "success" : "warning"
                } text-center mt-3`}
              >
                {message}
              </div>
            )}
            <MDBBtn className="w-100" type="submit">
              {isLoading ? <MDBIcon icon="spinner" spin /> : "Submit"}
            </MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}
