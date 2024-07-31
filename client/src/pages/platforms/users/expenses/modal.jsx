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
  MDBSelect,
  MDBSelectInput,
  MDBSelectOptions,
  MDBSelectOption,
} from "mdbreact";
import { SAVE, UPDATE } from "../../../../services/redux/slices/expenses";
import moment from "moment";

export default function Modal({ show, toggle, selected, willCreate }) {
  const { isLoading, message, isSuccess } = useSelector(
      ({ expenses }) => expenses
    ),
    { collections } = useSelector(({ budgets }) => budgets),
    { token, auth } = useSelector(({ auth }) => auth),
    [form, setForm] = useState({
      name: "",
      color: "",
      budget: "",
      amount: 0,
      start: moment().format("YYYY-MM-DDTHH:mm"),
      end: moment().format("YYYY-MM-DDTHH:mm"),
      user: auth?._id,
    }),
    [max, setMax] = useState({
      start: moment().format("YYYY-MM-DDTHH:mm"),
      end: moment().format("YYYY-MM-DDTHH:mm"),
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
      budget: "",
      amount: 0,
      start: moment().format("YYYY-MM-DDTHH:mm"),
      end: moment().format("YYYY-MM-DDTHH:mm"),
      user: auth?._id,
    });
    toggle();
  };

  const handleChangeBudget = (key, value) => {
    setForm({ ...form, [key]: value._id });
    setMax({
      start: moment(value.start).format("YYYY-MM-DDTHH:mm"),
      end: moment(value.end).format("YYYY-MM-DDTHH:mm"),
    });
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
        {selected.name || "an Expense"}
      </MDBModalHeader>
      <MDBModalBody className="mb-0">
        <form onSubmit={handleSubmit}>
          <MDBSelect
            getValue={e => handleChangeBudget("budget", e[0])}
            className="colorful-select dropdown-primary hidden-md-down"
            label="Budget"
          >
            <MDBSelectInput />
            <MDBSelectOptions>
              {collections.map((item, index) => {
                const isSelected = item._id === selected.role?._id;

                return (
                  <MDBSelectOption
                    selected={isSelected}
                    key={`role-${index}`}
                    value={item}
                  >
                    {`${item.name} - ${
                      new Date(item.start).toISOString().split("T")[0]
                    } / ${new Date(item.end).toISOString().split("T")[0]}`}
                  </MDBSelectOption>
                );
              })}
            </MDBSelectOptions>
          </MDBSelect>
          <MDBInput
            type="text"
            value={form.name}
            onChange={e => handleChange("name", e.target.value)}
            label="Name"
            required
          />
          <MDBInput
            type="number"
            value={String(form.amount)}
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

          {form.budget && (
            <MDBRow className="mt-0">
              <MDBCol md="6">
                <MDBInput
                  type="datetime-local"
                  value={form.start}
                  onChange={e => handleChange("start", e.target.value)}
                  label="Start"
                  max={max.start}
                  required
                />
              </MDBCol>
              <MDBCol md="6">
                <MDBInput
                  type="datetime-local"
                  max={max.end}
                  value={form.end}
                  onChange={e => handleChange("end", e.target.value)}
                  label="End"
                  required
                />
              </MDBCol>
            </MDBRow>
          )}
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
