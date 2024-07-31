import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
} from "mdbreact";
import { useHistory, useLocation } from "react-router";

export default function ProgressCheck() {
  const { progress } = useSelector(({ auth }) => auth),
    [show, setShow] = useState(false),
    location = useLocation(),
    history = useHistory();

  useEffect(() => {
    if (location.pathname !== "/profile/update" && progress.percentage < 63) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [progress, location]);

  return (
    <MDBModal
      size="lg"
      className="modal-notify modal-info"
      isOpen={show}
      toggle={() => {}}
    >
      <MDBModalHeader tag="p" titleClass="heading lead">
        Profile Completion is Required for Website Access
      </MDBModalHeader>
      <MDBModalBody>
        <p>
          Welcome to FinTip! We want to ensure that you have full access to our
          website's features and services. To proceed, it is mandatory to
          complete your profile by providing the required information.
        </p>
        <p>Why is profile completion necessary?</p>
        <ul>
          <li>
            Website Functionality: Providing your full name, address, and date
            of birth (DOB) is essential for the proper functioning of our
            website. Without this information, certain features and services
            will be unavailable to you.
          </li>
          <li>
            Data Security: We prioritize the security of your information. The
            provided data will be handled securely and in accordance with our
            strict privacy policies.
          </li>
        </ul>
        <p>
          Please note that failure to complete your profile with the required
          information may result in limited access to the website.
        </p>
        <p>
          To comply with this requirement, kindly provide your full name,
          address, and DOB accurately in the designated fields. These fields are
          marked as required.
        </p>
        <p>
          If you have any questions or require assistance during the profile
          completion process, our support team is available to help you.
        </p>
        <p>
          Thank you for your understanding and cooperation. We look forward to
          providing you with a comprehensive experience here on FinTip.
        </p>
      </MDBModalBody>
      <MDBModalFooter center>
        <MDBBtn onClick={() => history.push("/profile/update")} color="info">
          Complete Profile
        </MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  );
}
