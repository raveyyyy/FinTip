import { MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import React from "react";

export default function Terms({ show, handleShow }) {
  return (
    <MDBModal
      size="lg"
      className="modal-notify modal-info"
      isOpen={show}
      toggle={handleShow}
    >
      <MDBModalHeader tag="p" titleClass="heading lead">
        Terms and Conditions
      </MDBModalHeader>
      <MDBModalBody>
        <p>
          Welcome to FinTip! We want to ensure that you have full access to our
          website's features and services. To proceed, it is mandatory to need
          email address information and password
        </p>
        <br />
        <ol>
          <li>
            1.1 By using our services and providing your email and password, you
            agree to comply with these Terms and Conditions.
            <br /> 1.2 These Terms and Conditions may be updated from time to
            time, and it is your responsibility to review them periodically.
          </li>
          <li>
            2.1 You must provide accurate and complete information when creating
            your account.
            <br /> 2.2 You are responsible for maintaining the confidentiality
            of your email and password. 2.3 Notify us immediately of any
            unauthorized use of your account or any breach of security.
          </li>
          <li>
            3.1 Choose a strong password and update it regularly. <br />
            3.2 Do not share your password with others.
            <br /> 3.3 We will never ask for your password via email or other
            non-secure communication channels.
          </li>
          <li>
            4.1 You are solely responsible for all activities conducted through
            your account. <br />
            4.2 Notify us promptly of any changes to your email address or other
            account information.
          </li>
          <li>
            5.1 We are committed to protecting your privacy. Refer to our
            Privacy Policy for details on how we collect, use, and disclose your
            information. 5.2 We use industry-standard security measures to
            protect your email and password information.
          </li>
          <li>
            6.1 We reserve the right to terminate or suspend your account at our
            discretion, without prior notice, if we believe you have violated
            these Terms and Conditions.
          </li>
          <li>
            7.1 We may store and process your email and password information for
            the purpose of providing and improving our services. <br />
            7.2 We will not sell or disclose your email and password to third
            parties without your explicit consent, except as required by law.
          </li>
          <li>
            8.1 For questions or concerns regarding these Terms and Conditions,
            please contact us at FinTip.support@gmail.com.
          </li>
        </ol>

        <p>
          By using our services, you acknowledge that you have read, understood,
          and agreed to these Terms and Conditions. Thank you for your
          understanding and cooperation. We look forward to providing you with a
          comprehensive experience here on FinTip.
        </p>
      </MDBModalBody>
    </MDBModal>
  );
}
