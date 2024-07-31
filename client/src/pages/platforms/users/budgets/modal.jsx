import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBIcon,
  MDBModalHeader,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdbreact";
import { SAVE, UPDATE } from "../../../../services/redux/slices/budgets";
import moment from "moment";

export default function Modal({ show, toggle, selected, willCreate }) {
  const { isLoading, message, isSuccess } = useSelector(
      ({ budgets }) => budgets
    ),
    { token, auth } = useSelector(({ auth }) => auth),
    [form, setForm] = useState({
      color: "",
      name: "",
      amount: 0,
      start: moment().format("YYYY-MM-DD"),
      end: moment().format("YYYY-MM-DD"),
      user: auth?._id,
    }),
    dispatch = useDispatch();

  useEffect(() => {
    if (selected._id) {
      setForm(selected);
    }
  }, [selected]);

  const handleUpdate = () =>
    dispatch(
      UPDATE({
        data: form,
        token,
      })
    );

  const handleSave = () =>
    dispatch(
      SAVE({
        data: form,
        token,
      })
    );

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleSubmit = e => {
    e.preventDefault();

    if (willCreate) {
      handleSave();
    } else {
      handleUpdate();
    }
    setForm({
      color: "",
      name: "",
      amount: 0,
      start: moment().format("YYYY-MM-DD"),
      end: moment().format("YYYY-MM-DD"),
      user: auth?._id,
    });
    toggle();
  };

  return (
    <MDBModal
      isOpen={show}
      toggle={toggle}
      backdrop={true}
      disableFocusTrap={false}
    >
      <MDBModalHeader
        toggle={toggle}
        className="light-blue darken-3 white-text"
      >
        <MDBIcon icon="todo" className="mr-2" />
        {willCreate ? "Create" : "Update"}&nbsp;
        {selected.name || "an Budget"}
      </MDBModalHeader>
      <MDBModalBody className="mb-0">
        <form onSubmit={handleSubmit}>
          <MDBInput
            type="text"
            value={form.name}
            onChange={e => handleChange("name", e.target.value)}
            label="Name"
            required
          />
          <MDBInput
            type="number"
            value={form.amount}
            onChange={e => handleChange("amount", e.target.value)}
            label="Amount"
            required
          />
          <input
            type="color"
            value={form.color}
            onChange={e => handleChange("color", e.target.value)}
            required
            id="color"
          />
          <label htmlFor="color">Color</label>
          <MDBRow className="mt-0">
            <MDBCol md="6">
              <MDBInput
                type="date"
                value={form.start}
                onChange={e => handleChange("start", e.target.value)}
                label="Start"
                required
              />
            </MDBCol>
            <MDBCol md="6">
              <MDBInput
                type="date"
                value={form.end}
                onChange={e => handleChange("end", e.target.value)}
                label="End"
                required
              />
            </MDBCol>
          </MDBRow>
          {message && (
            <div
              className={`alert alert-${
                isSuccess ? "success" : "warning"
              } text-center mt-3`}
            >
              {message}
            </div>
          )}
          <div className="text-center mb-1-half">
            <MDBBtn
              type="submit"
              disabled={isLoading}
              color="info"
              className="mb-2"
              rounded
            >
              {willCreate ? "submit" : "update"}
            </MDBBtn>
          </div>
        </form>
      </MDBModalBody>
    </MDBModal>
  );
}
