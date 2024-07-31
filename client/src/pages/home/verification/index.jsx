import React, { useEffect } from "react";
import { VERIFY } from "../../../services/redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useLocation } from "react-router";
import { MDBSpinner } from "mdbreact";

export default function Verification() {
  const { auth, isSuccess, message } = useSelector(({ auth }) => auth),
    dispatch = useDispatch(),
    history = useHistory(),
    location = useLocation(),
    { token } = useParams();

  useEffect(() => {
    if (auth._id && isSuccess) {
      history.push("/dashboard");
    }
  }, [auth, isSuccess, history, location]);
  useEffect(() => {
    dispatch(VERIFY({ token, data: {} }));
  }, [token, dispatch]);
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 ">
      <h1>{message || "Verifying"}</h1>
      <MDBSpinner />
    </div>
  );
}
