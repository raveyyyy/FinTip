import React, { useState, useEffect } from "react";
import {
  MDBAnimation,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBRow,
} from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { CUSTOMALERT, SAVE } from "../../../services/redux/slices/users";
import Terms from "../terms/terms";

export default function Register() {
  const [isLocked, setIsLocked] = useState({
      password: true,
      confirmPassword: true,
    }),
    { message, isLoading, isSuccess } = useSelector(({ users }) => users),
    [show, setShow] = useState(false),
    dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    const { email, password, confirmPassword } = e.target;

    if (password.value === confirmPassword.value) {
      dispatch(
        SAVE({
          email: email.value,
          password: password.value,
          role: "647dd1e9dced91b0b39444ad",
          wasBanned: true,
          banned: {
            at: new Date().toLocaleString(),
            for: "Account is still being processed.",
            by: "647dd2a5dced91b0b39444b3",
          },
        })
      );
    } else {
      dispatch(CUSTOMALERT("Passwords does not match."));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      document.getElementById("registration-form").reset();
    }
  }, [isSuccess]);

  const handleShow = () => setShow(!show);

  return (
    <MDBRow className="flex-center pt-5 mt-3 text-info">
      <MDBCol md="6" className="text-center text-md-left mb-5">
        <MDBAnimation type="fadeInLeft">
          <div className="white-text">
            <h1 className="h1-responsive font-weight-bold">
              Join us right now!
            </h1>
            <hr className="hr-light" />
            <h6>
              In the dynamic landscape of modern finance, Fintip stands out as a
              cutting-edge financial system designed to revolutionize the way
              individuals manage and interact with their financial data.
              Meticulously crafted with advanced features, Fintip offers a
              secure, user-friendly, and comprehensive platform for individuals
              to monitor, analyze, and optimize their financial activities.
            </h6>
          </div>
        </MDBAnimation>
      </MDBCol>
      <MDBCol md="6" className="col-xl-5 offset-xl-1">
        <MDBAnimation type="fadeInRight">
          <form
            onSubmit={handleSubmit}
            id="registration-form"
            autoComplete="off"
          >
            <MDBCard>
              <MDBCardBody>
                <div className="text-center">
                  <h3 className="white-text">
                    <MDBIcon icon="user" className="white-text" /> Register
                  </h3>
                  <hr className="hr-light" />
                </div>

                <MDBInput
                  className="white-text"
                  label="E-mail Address"
                  icon="envelope"
                  type="email"
                  labelClass="white-text"
                  iconClass="white-text"
                  name="email"
                  required
                />
                <MDBInput
                  className="white-text"
                  label="Password"
                  minLength={8}
                  icon={isLocked.password ? "lock" : "unlock"}
                  onIconMouseEnter={() =>
                    setIsLocked({ ...isLocked, password: false })
                  }
                  onIconMouseLeave={() =>
                    setIsLocked({ ...isLocked, password: true })
                  }
                  type={isLocked.password ? "password" : "text"}
                  labelClass="white-text"
                  iconClass="white-text"
                  name="password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  required
                />
                <MDBInput
                  className="white-text"
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
                  labelClass="white-text"
                  iconClass="white-text"
                  name="confirmPassword"
                  required
                />

                <input
                  className="form-check-input"
                  type="checkbox"
                  id={"agreement"}
                  required
                />
                <label
                  onClick={() => handleShow()}
                  htmlFor={"agreement"}
                  className="white-text"
                >
                  I read and agree with the Terms and Conditions
                </label>
                {message && (
                  <div
                    className={`alert alert-${
                      isSuccess ? "success" : "warning"
                    } text-center mt-3`}
                  >
                    {message}
                  </div>
                )}

                <div className="text-center mt-4">
                  <MDBBtn
                    disabled={isLoading}
                    type="submit"
                    color="light-blue"
                    rounded
                  >
                    {isLoading ? <MDBIcon icon="spinner" spin /> : "Sign up"}
                  </MDBBtn>
                  <hr className="hr-light mb-3 mt-4" />

                  {/* <div className="inline-ul text-center d-flex justify-content-center">
                  <MDBIcon
                    fab
                    icon="google"
                    size="lg"
                    className="white-text p-2 m-2 cursor-pointer"
                  />
                  <MDBIcon
                    fab
                    icon="facebook"
                    size="lg"
                    className="white-text p-2 m-2 cursor-pointer"
                  />
                  <MDBIcon
                    fab
                    icon="yahoo"
                    size="lg"
                    className="white-text p-2 m-2 cursor-pointer"
                  />
                </div> */}
                </div>
              </MDBCardBody>
            </MDBCard>
          </form>
        </MDBAnimation>
      </MDBCol>
      <Terms show={show} handleShow={handleShow} />
    </MDBRow>
  );
}
