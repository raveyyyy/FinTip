import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBNavLink,
} from "mdbreact";
import { useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../../../services/redux/slices/auth";
import { PresetImage } from "../../../services/utilities";

export default function Login({ show, toggle = null }) {
  const { auth, email, isLoading, isSuccess, message, image, token } =
      useSelector(({ auth }) => auth),
    [isLocked, setIsLocked] = useState(true),
    history = useHistory(),
    location = useLocation(),
    dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    const { address, password } = e.target;

    dispatch(
      LOGIN({
        email: email || address.value,
        password: password.value,
      })
    );
  };

  useEffect(() => {
    if (auth._id && isSuccess && token) {
      if (location.pathname === "/") {
        history.push("/dashboard");
      } else {
        window.location.reload();
      }
    }
  }, [auth, isSuccess, history, location]);

  return (
    <MDBModal
      size={email ? "sm" : "md"}
      isOpen={show}
      backdrop={true}
      cascading
      disableFocusTrap={false}
      className={`${email && "modal-avatar"}`}
    >
      <MDBModalHeader
        toggle={email ? null : toggle}
        className={`${email ? "mx-auto" : "light-blue darken-3 white-text"}`}
      >
        {email ? (
          <img
            src={image}
            onError={e => (e.target.src = PresetImage(auth.isMale))}
            alt={`avatar-${auth._id}`}
            className="rounded-circle img-responsive"
          />
        ) : (
          "Login"
        )}
      </MDBModalHeader>
      <MDBModalBody className="mb-0">
        <form onSubmit={handleSubmit}>
          {email ? (
            <div className="text-center">{email}</div>
          ) : (
            <MDBInput
              label="E-mail Address"
              type="email"
              icon="envelope"
              name="address"
              required
            />
          )}
          <MDBInput
            label="Password"
            name="password"
            minLength={8}
            icon={isLocked ? "lock" : "unlock"}
            onIconMouseEnter={() => setIsLocked(false)}
            onIconMouseLeave={() => setIsLocked(true)}
            type={isLocked ? "password" : "text"}
            required
          />
          <MDBNavLink to="/forgot-password">Forgot Password</MDBNavLink>
          {message && (
            <div
              className={`alert alert-${
                isSuccess ? "success" : "warning"
              } text-center`}
            >
              {message}
            </div>
          )}

          <div
            className={`text-center mb-1-half ${
              email && "d-flex justify-content-between"
            }`}
          >
            {email && (
              <MDBBtn
                disabled={isLoading}
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("email");
                  window.location.reload();
                }}
                size="sm"
                rounded
                type="button"
              >
                logout
              </MDBBtn>
            )}
            <MDBBtn
              disabled={isLoading}
              size={email ? "sm" : "md"}
              type="submit"
              color="info"
              className="mb-2"
              rounded
            >
              {isLoading ? (
                <MDBIcon icon="spinner" spin />
              ) : email ? (
                "proceed"
              ) : (
                "Sign in"
              )}
            </MDBBtn>
          </div>
        </form>
      </MDBModalBody>
    </MDBModal>
  );
}
