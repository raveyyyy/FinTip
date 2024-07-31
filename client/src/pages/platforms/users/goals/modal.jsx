import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBIcon,
  MDBModalHeader,
  MDBInput,
} from "mdbreact";
import { SAVE, UPDATE } from "../../../../services/redux/slices/goals";
import moment from "moment";

export default function Modal({ show, toggle, selected, willCreate }) {
  const { isLoading, message, isSuccess } = useSelector(({ goals }) => goals),
    { token, auth } = useSelector(({ auth }) => auth),
    [form, setForm] = useState({
      color: "",
      target: 0,
      start: moment().format("YYYY-MM-DDTHH:mm"),
      user: auth?._id,
    }),
    dispatch = useDispatch();

  useEffect(() => {
    if (selected._id) {
      setForm({
        color: selected.color,
        _id: selected._id,
        target: selected.target,
        start: moment(selected.start).format("YYYY-MM-DDTHH:mm"),
        user: selected?.user,
      });
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
        {selected.name || "an Event"}
      </MDBModalHeader>
      <MDBModalBody className="mb-0">
        <form onSubmit={handleSubmit}>
          <MDBInput
            type="number"
            value={form.target}
            onChange={e => handleChange("target", e.target.value)}
            label="Target"
            required
          />
          <MDBInput
            type="datetime-local"
            value={form.start}
            onChange={e => handleChange("start", e.target.value)}
            label="Start"
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
