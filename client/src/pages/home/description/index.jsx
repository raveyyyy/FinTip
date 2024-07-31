import React from "react";
import Phone from "../../../assets/landing/phone.jpg";
import { MDBRow, MDBCol, MDBIcon, MDBAnimation } from "mdbreact";

export default function Description() {
  return (
    <section className="section my-5wow fadeIn" data-wow-delay="0.3s">
      <MDBAnimation type="fadeInUp" reveal>
        <h1 className="text-center my-5 h1">Why is it so great?</h1>
      </MDBAnimation>
      <MDBAnimation type="fadeInUp" reveal>
        <p className="text-center mb-5 w-responsive mx-auto">
          Fintip provides users with seamless digital access to their financial
          data, empowering them to stay connected with their financial health
          anytime, anywhere. The intuitive web-based system online interface
          make it easy for users to navigate and manage their financial
          information with just a few clicks.
        </p>
      </MDBAnimation>
      <MDBRow>
        <MDBCol md="4">
          <MDBRow className="mb-2">
            <MDBCol size="2">
              <MDBAnimation reveal type="fadeInLeftBig" duration="1.25s">
                <MDBIcon size="2x" className="indigo-text" icon="shield-alt" />
              </MDBAnimation>
            </MDBCol>
            <MDBCol size="10">
              <MDBAnimation reveal type="fadeInLeftBig">
                <h5 className="font-weight-bold my-4">Secure</h5>
                <p>
                  Security is at the core of Fintip's design. Employing
                  state-of-the-art encryption, multi-layered authentication, and
                  continuous monitoring, Fintip ensures that your financial data
                  remains confidential and protected from potential threats.
                  Trust Fintip to safeguard your sensitive information with the
                  highest level of security.
                </p>
              </MDBAnimation>
            </MDBCol>
          </MDBRow>

          <MDBRow className="mb-2">
            <MDBCol size="2">
              <MDBAnimation reveal type="fadeInLeftBig" duration="1.25s">
                <MDBIcon size="2x" className="blue-text" icon="flask" />
              </MDBAnimation>
            </MDBCol>
            <MDBCol size="10">
              <MDBAnimation reveal type="fadeInLeftBig">
                <h5 className="font-weight-bold my-4">Experimental</h5>
                <p>
                  Fintip is designed to evolve with your financial needs. Its
                  scalable architecture and adaptability to emerging
                  technologies ensure that it remains a relevant and reliable
                  financial companion as the financial landscape continues to
                  evolve.
                </p>
              </MDBAnimation>
            </MDBCol>
          </MDBRow>

          <MDBRow className="mb-2">
            <MDBCol size="2">
              <MDBAnimation reveal type="fadeInLeftBig" duration="1.25s">
                <MDBIcon
                  size="2x"
                  className="cyan-text"
                  icon="glass-martini-alt"
                />
              </MDBAnimation>
            </MDBCol>
            <MDBCol size="10">
              <MDBAnimation reveal type="fadeInLeftBig">
                <h5 className="font-weight-bold my-4">Relaxing</h5>
                <p>
                  Fintip goes beyond individual accounts, seamlessly integrating
                  with various financial institutions. This integration allows
                  users to consolidate data from different sources, providing a
                  holistic view of their financial landscape within the Fintip
                  platform.
                </p>
              </MDBAnimation>
            </MDBCol>
          </MDBRow>
        </MDBCol>
        <MDBCol md="4 mb-2 text-center text-md-left flex-center">
          <MDBAnimation reveal type="fadeInUp">
            <img src={Phone} alt="" className="z-depth-0" />
          </MDBAnimation>
        </MDBCol>

        <MDBCol md="4">
          <MDBRow className="mb-2">
            <MDBCol size="10" className="text-right">
              <MDBAnimation reveal type="fadeInRightBig">
                <h5 className="font-weight-bold my-4">Beloved</h5>
                <p>
                  Fintip tabled data in maintaining a detailed record of your
                  financial transactions. Users can access comprehensive
                  statements, transaction histories, and interactive financial
                  summaries, offering transparency and clarity in understanding
                  their financial journey.
                </p>
              </MDBAnimation>
            </MDBCol>
            <MDBCol size="2">
              <MDBAnimation reveal type="fadeInRightBig" duration="1.25s">
                <MDBIcon size="2x" icon="heart" className="deep-purple-text" />
              </MDBAnimation>
            </MDBCol>
          </MDBRow>

          <MDBRow className="mb-2">
            <MDBCol size="10" className="text-right">
              <MDBAnimation reveal type="fadeInRightBig">
                <h5 className="font-weight-bold my-4">Rapid</h5>
                <p>
                  Fintip empowers users to efficiently manage their financial
                  goals with ease. It provides a convenient platform where users
                  can effortlessly set up and track their savings, investments,
                  and expenses in one place.
                </p>
              </MDBAnimation>
            </MDBCol>
            <MDBCol size="2">
              <MDBAnimation reveal type="fadeInRightBig" duration="1.25s">
                <MDBIcon size="2x" icon="bolt" className="text-warning" />
              </MDBAnimation>
            </MDBCol>
          </MDBRow>

          <MDBRow className="mb-2">
            <MDBCol size="10" className="text-right">
              <MDBAnimation reveal type="fadeInRightBig">
                <h5 className="font-weight-bold my-4">Magical</h5>
                <p>
                  Fintip adheres to stringent regulatory standards, ensuring
                  compliance with financial regulations. Users can trust Fintip
                  to handle their financial data responsibly, fostering a sense
                  of security and compliance with industry standards.
                </p>
              </MDBAnimation>
            </MDBCol>
            <MDBCol size="2">
              <MDBAnimation reveal type="fadeInRightBig" duration="1.25s">
                <MDBIcon size="2x" icon="magic" className="pink-text" />
              </MDBAnimation>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </section>
  );
}
