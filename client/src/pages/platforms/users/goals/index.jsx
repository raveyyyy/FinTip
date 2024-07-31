import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FIND, RESET } from "../../../../services/redux/slices/goals";
import { globalSearch } from "../../../../services/utilities";
import { useToasts } from "react-toast-notifications";
import Modal from "./modal";
import DataTable from "../../../../components/dataTable";
import ReactCalendar from "./calendar";
import formatCurrency from "../../../../services/utilities/formatCurrency";
import { MDBBadge } from "mdbreact";
import Bots from "../bots";

export default function Goals() {
  const [isActive, setIsActive] = useState(true),
    [goals, setGoals] = useState([]),
    [selected, setSelected] = useState({}),
    [willCreate, setWillCreate] = useState(true),
    [showModal, setShowModal] = useState(false),
    { token, auth } = useSelector(({ auth }) => auth),
    { collections, message, isSuccess, isLoading } = useSelector(
      ({ goals }) => goals
    ),
    { addToast } = useToasts(),
    dispatch = useDispatch();

  const handleSwitch = () => setIsActive(!isActive);

  useEffect(() => {
    if (token) {
      dispatch(
        FIND({
          token,
          key: {
            user: `{"$eq": "${auth._id}"}`,
          },
        })
      );
    }

    return () => {
      dispatch(RESET());
    };
  }, [token, auth, dispatch]);

  useEffect(() => {
    setGoals(collections);
  }, [isActive, collections]);

  const toggleModal = () => {
    if (selected._id) {
      setSelected({});
    }
    if (message) {
      dispatch(RESET());
    }
    setShowModal(!showModal);
  };

  const handleUpdate = selected => {
    setSelected(selected);
    if (willCreate) {
      setWillCreate(false);
    }
    toggleModal();
  };
  useEffect(() => {
    if (message) {
      addToast(message, {
        appearance: isSuccess ? "success" : "error",
      });
    }
  }, [isSuccess, message, addToast]);

  const handleSearch = async (willSearch, key) => {
    if (willSearch) {
      setGoals(globalSearch(goals, key));
    } else {
      setGoals(collections);
    }
  };

  return (
    <>
      <DataTable
        isLoading={isLoading}
        title="Active Goals"
        array={goals}
        actions={[
          {
            _title: "Calendar view",
            _icon: "sync",
            _function: handleSwitch,
            _shouldReset: true,
            _disabledOnSearch: true,
          },
          {
            _title: "Edit selected",
            _icon: "pen-alt",
            _function: handleUpdate,
            _condition: () => !isActive,
            _haveSelect: true,
            _allowMultiple: false,
            _shouldReset: true,
          },
        ]}
        tableHeads={[
          {
            _text: "For",
          },
          {
            _text: "Name",
          },
          {
            _text: "Status",
          },
          {
            _text: "Target amount",
          },
          {
            _text: "Target Date",
          },
        ]}
        tableBodies={[
          {
            _key: "investment",
            _format: data => (data.name ? "Investment" : "Savings"),
          },
          {
            _key: "investment",
            _format: (data, item) => {
              return data.name ? data.name : item?.saving?.name;
            },
          },
          {
            _key: "investment",
            _format: (data, item) => {
              return data.amount ? (
                data.amount >= item?.target ? (
                  <MDBBadge className="pt-2 rounded h3" color="success">
                    <p className="h6">Reach</p>
                  </MDBBadge>
                ) : (
                  <MDBBadge className="pt-2 rounded h3" color="warning">
                    <p className="h6">Awaiting</p>
                  </MDBBadge>
                )
              ) : item?.saving?.balance >= item?.target ? (
                <MDBBadge className="pt-2 rounded h3" color="success">
                  <p className="h6">Reach</p>
                </MDBBadge>
              ) : (
                <MDBBadge className="pt-2 rounded h3" color="warning">
                  <p className="h6">Awaiting</p>
                </MDBBadge>
              );
            },
          },
          {
            _key: "target",
            _format: data => formatCurrency(data),
          },
          {
            _key: "start",
            _format: data => new Date(data).toLocaleString(),
          },
        ]}
        disableSearch={isActive}
        handleSearch={handleSearch}
        toggleComponent={isActive}
        customComponent={<ReactCalendar />}
      />
      <Modal
        key={selected._id || "event-initial-create"}
        selected={selected}
        willCreate={willCreate}
        show={showModal}
        toggle={toggleModal}
      />
      {auth?.role?.name === "VIP" && <Bots promt="financial goals" />}
    </>
  );
}
