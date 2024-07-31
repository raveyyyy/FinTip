import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBIcon,
  MDBModalHeader,
  MDBInput,
  MDBSwitch,
  MDBRow,
  MDBCol,
} from "mdbreact";
import { SAVE, UPDATE } from "../../../../services/redux/slices/savings";
import moment from "moment";

export default function Modal({ show, toggle, selected, willCreate }) {
  const { isLoading } = useSelector(({ roles }) => roles),
    { token, auth } = useSelector(({ auth }) => auth),
    [form, setForm] = useState({
      start: moment().format("YYYY-MM-DD"),
      name: "",
      isMonthly: true,
      user: auth._id,
      balance: 0,
      increase: 0,
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
      start: moment().format("YYYY-MM-DD"),
      name: "",
      isMonthly: true,
      user: auth._id,
      increase: 0,
      balance: 0,
    });
    toggle();
  };

  useEffect(() => {
    if (selected._id) {
      let updates = {
        start: moment(selected.start).format("YYYY-MM-DD"),
        _id: selected._id,
        name: selected.name,
        balance: selected.balance,
        increase: selected.increase,
        isMonthly: selected.isMonthly,
      };
      setForm(updates);
    }
  }, [selected]);
  const handleCreate = () =>
    dispatch(
      SAVE({
        data: {
          ...form,
          _id: selected._id,
        },
        token,
      })
    );

  const handleSubmit = e => {
    e.preventDefault();

    if (willCreate) {
      handleCreate();
    } else {
      handleUpdate();
    }

    setForm({
      start: moment().format("YYYY-MM-DDTHH:mm"),
      name: "",
      user: auth._id,
      increase: 0,
      balance: 0,
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
        <MDBIcon icon="user" className="mr-2" />
        {willCreate ? "Create" : "Update"} {selected.name || "a Saving"}
      </MDBModalHeader>
      <MDBModalBody className="mb-0">
        <form onSubmit={handleSubmit}>
          <MDBInput
            type="text"
            label="Account Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
            icon="user"
          />
          <MDBInput
            type="number"
            value={form.balance}
            onChange={e => setForm({ ...form, balance: e.target.value })}
            required
            label="Balance"
            icon="dollar-sign"
          />
          <MDBRow>
            <MDBCol md="6">
              <MDBInput
                type="number"
                value={form.increase}
                onChange={e => setForm({ ...form, increase: e.target.value })}
                required
                label="Increase rate(%)"
                icon="arrow-up"
              />
            </MDBCol>
            <MDBCol md="6" className="d-flex align-items-center">
              <MDBSwitch
                labelRight="Monthly"
                labelLeft="Annualy"
                checked={form.isMonthly}
                onChange={e => setForm({ ...form, isMonthly: !form.isMonthly })}
              />
            </MDBCol>
          </MDBRow>
          <MDBInput
            max={moment(new Date()).format("YYYY-MM-DD")}
            icon="calendar"
            type="date"
            value={form.start}
            onChange={e => setForm({ ...form, start: e.target.value })}
            label="Start"
            required
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
