import React from "react";
import { MDBCol, MDBAvatar, MDBRow, MDBIcon } from "mdbreact";
import Steph from "./../../../assets/landing/steph.png";
import Kazandra from "./../../../assets/landing/kazandra.jpg";
import Marc from "./../../../assets/landing/marc.jpg";
import Gragg from "./../../../assets/landing/gragg.png";

export default function Pioneers() {
  return (
    <section className="team-section text-center my-5">
      <h1 className="text-center my-5 h1">About us</h1>
      <p className="text-center mb-5 w-responsive mx-auto">
        Our team is composed of talented professionals with diverse expertise,
        working collaboratively to deliver exceptional results for our clients.
      </p>

      <MDBRow className="text-center">
        <MDBCol md="3" className="mb-4">
          <div className="testimonial">
            <MDBAvatar
              tag="img"
              src={Steph}
              circle
              className="z-depth-1 w-100"
            />

            <h4 className="font-weight-bold mt-4 mb-3">Baludda</h4>
            <h6 className="mb-3 font-weight-bold text-info">PROGRAMMER</h6>
            <p>
              <MDBIcon icon="quote-left" /> My role involves writing code,
              testing and debugging software, and collaborating with other team
              members to ensure the successful completion of the project.
            </p>
          </div>
        </MDBCol>

        <MDBCol md="3" className="mb-4">
          <div className="testimonial">
            <MDBAvatar
              tag="img"
              src={Gragg}
              circle
              className="z-depth-1 w-100"
            />
            <h4 className="font-weight-bold mt-4 mb-3">Gragg</h4>
            <h6 className="mb-3 font-weight-bold text-info">PROGRAMMER</h6>
            <p>
              <MDBIcon icon="quote-left" /> , I am responsible for writing and
              implementing code to bring the project to life and ensure its
              functionality.
            </p>
          </div>
        </MDBCol>

        <MDBCol md="3" className="mb-4">
          <div className="testimonial">
            <MDBAvatar
              tag="img"
              src={Kazandra}
              circle
              className="z-depth-1 w-100"
            />
            <h4 className="font-weight-bold mt-4 mb-3">Javier</h4>
            <h6 className="mb-3 font-weight-bold text-info">DOCUMENTER</h6>
            <p>
              <MDBIcon icon="quote-left" /> I create concise documentation
              outlining project goals, requirements, and progress, working
              closely with the development team to keep everything organized.
            </p>
          </div>
        </MDBCol>
        <MDBCol md="3" className="mb-4">
          <div className="testimonial">
            <MDBAvatar
              tag="img"
              src={Marc}
              circle
              className="z-depth-1 w-100"
            />
            <h4 className="font-weight-bold mt-4 mb-3">Santillan </h4>
            <h6 className="mb-3 font-weight-bold text-info">DOCUMENTER</h6>
            <p>
              <MDBIcon icon="quote-left" /> I create clear and concise
              documentation to keep the project organized and on track.
            </p>
          </div>
        </MDBCol>
      </MDBRow>
    </section>
  );
}
