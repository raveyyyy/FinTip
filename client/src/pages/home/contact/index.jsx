import React from "react";
import { MDBCol, MDBIcon, MDBInput, MDBRow, MDBBtn } from "mdbreact";

export default function ContactUs() {
  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <MDBRow>
        <MDBCol lg="8">
          <MDBRow>
            <MDBCol md="6">
              <div className="md-form mb-0">
                <MDBInput type="text" label="Your name" name="name" required />
              </div>
            </MDBCol>
            <MDBCol md="6">
              <div className="md-form mb-0">
                <MDBInput
                  type="text"
                  label="Your email"
                  name="email"
                  required
                />
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="12">
              <div className="md-form mb-0">
                <MDBInput type="text" label="Subject" name="subject" required />
              </div>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md="12">
              <div className="md-form mb-0">
                <MDBInput
                  type="textarea"
                  label="Your message"
                  name="message"
                  required
                />
              </div>
            </MDBCol>
          </MDBRow>
        </MDBCol>
        <MDBCol lg="4" className="text-center">
          <ul className="text-center list-unstyled">
            <li>
              <MDBIcon icon="map-marker-alt" size="2x" />
              <p>Sample address</p>
            </li>
            <li>
              <MDBIcon icon="mobile-alt" size="2x" />
              <p>+63 912-1233-123</p>
            </li>
            <li>
              <MDBIcon icon="envelope" size="2x" />
              <p>customer_support@FinTip.com</p>
            </li>
          </ul>
          <MDBBtn
            type="submit"
            rounded
            color="light-blue"
            className="mt-2 ml-0"
          >
            Send
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </form>
  );
}
