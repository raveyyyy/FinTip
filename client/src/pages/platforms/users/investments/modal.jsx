import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBIcon,
  MDBModalHeader,
  MDBInput,
} from "mdbreact";
import { SAVE, UPDATE } from "../../../../services/redux/slices/investments";

export default function Modal({ show, toggle, selected, willCreate }) {
  const { isLoading } = useSelector(({ roles }) => roles),
    { token, auth } = useSelector(({ auth }) => auth),
    [form, setForm] = useState({
      name: "",
      type: "",
      user: auth._id,
      amount: 0,
      return: 0,
    }),
    dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(
      UPDATE({
        data: { ...form, _id: selected._id },
        token,
      })
    );

    setForm({
      name: "",
      type: "",
      user: auth._id,
      amount: 0,
      return: 0,
    });
    toggle();
  };

  useEffect(() => {
    if (selected._id) {
      // let updates = {
      //   _id: selected._id,
      //   name: selected.name,
      //   amount: selected.amount,
      //   type: selected.type,
      //   return: selected.return,
      // };
      setForm(selected);
    }
  }, [selected]);
  const handleCreate = () => {
    dispatch(
      SAVE({
        data: {
          ...form,
          _id: selected._id,
        },
        token,
      })
    );

    setForm({
      type: "",
      name: "",
      user: auth._id,
      amount: 0,
      return: 0,
    });
    toggle();
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (willCreate) {
      handleCreate();
    } else {
      handleUpdate();
    }
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
        <MDBIcon icon="user" className="mr-2" />
        {willCreate ? "Create" : "Update"} {selected.name || "a Investment"}
      </MDBModalHeader>
      <MDBModalBody className="mb-0">
        <form onSubmit={handleSubmit}>
          <MDBInput
            type="text"
            label="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
            icon="marker"
          />
          <MDBInput
            type="text"
            label="Type"
            value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
            required
            icon="list-ul"
          />
          <MDBInput
            type="number"
            value={form.amount}
            onChange={e => setForm({ ...form, amount: e.target.value })}
            required
            label="Amount"
            icon="dollar-sign"
          />
          <MDBInput
            type="number"
            value={form.return}
            onChange={e => setForm({ ...form, return: e.target.value })}
            required
            label="Return"
            icon="hand-holding-usd"
          />
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
