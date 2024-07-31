import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBAvatar,
  MDBBtn,
} from "mdbreact";
import { useSelector } from "react-redux";
import {
  PresetImage,
  fullAddress,
  fullName,
} from "../../../services/utilities";
import { useHistory } from "react-router";

export default function ViewProfile({ user }) {
  const { image, auth } = useSelector(({ auth }) => auth),
    [account, setAccount] = useState({}),
    history = useHistory();

  useEffect(() => {
    setAccount(user && user._id ? user : auth);
  }, [auth, user]);

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol md="12" className="text-center">
          <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
            <h4>
              <strong>{auth.fullName?.fname}'s Profile</strong>
            </h4>
            <MDBBtn
              color="info"
              rounded
              size="sm"
              onClick={() => history.push("/profile/update")}
            >
              Update profile
            </MDBBtn>
          </div>
        </MDBCol>
        <MDBCol md="12">
          <MDBCard testimonial className="profile-card text-center mb-4 mt-5">
            <MDBAvatar
              tag="img"
              alt={`view-profile-${account._id}`}
              src={image}
              onError={e => (e.target.src = PresetImage(account.isMale))}
              className="z-depth-1-half mx-auto w-25 h-25"
            />
            <MDBCardBody>
              <MDBCardTitle>
                <strong>{fullName(account.fullName)}</strong>
              </MDBCardTitle>
              <h5>{account.role?.name}</h5>
              {auth.address && (
                <p className="dark-grey-text">
                  {fullAddress(auth.address, false)}
                </p>
              )}

              <p className="card-text mt-3">{auth.bio}</p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
