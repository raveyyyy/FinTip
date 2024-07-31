import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DESTROY,
  FIND,
  RESET,
} from "../../../../services/redux/slices/budgets";
import { globalSearch } from "../../../../services/utilities";
import { useToasts } from "react-toast-notifications";
import Swal from "sweetalert2";
import Modal from "./modal";
import DataTable from "../../../../components/dataTable";
import ReactCalendar from "./calendar";
import formatCurrency from "../../../../services/utilities/formatCurrency";
import Bots from "./../bots";

export default function Budgets() {
  const [isActive, setIsActive] = useState(true),
    [budgets, setBudgets] = useState([]),
    [selected, setSelected] = useState({}),
    [willCreate, setWillCreate] = useState(true),
    [showModal, setShowModal] = useState(false),
    { token, auth } = useSelector(({ auth }) => auth),
    { collections, message, isSuccess, isLoading } = useSelector(
      ({ budgets }) => budgets
    ),
    { addToast } = useToasts(),
    dispatch = useDispatch();

  const handleSwitch = () => setIsActive(!isActive);

  useEffect(() => {
    if (token && auth._id) {
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
    setBudgets(collections.filter(e => e.deleted === false));
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

  const handleCreate = () => {
    if (!willCreate) {
      setWillCreate(true);
    }
    toggleModal();
  };

  const handleDestroy = selected =>
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to permanently delete ${selected.length} Budget(s).`,
      icon: "warning",
      confirmButtonText: "Proceed",
      cancelButtonColor: "#d33",
      showCancelButton: true,
    }).then(res => {
      if (res.isConfirmed) {
        const toDestroy = selected.map(item => ({
          _id: item._id,
          deleted: true,
        }));

        dispatch(
          DESTROY({
            data: toDestroy.length > 1 ? toDestroy : toDestroy[0],
            token,
          })
        );
      }
    });

  useEffect(() => {
    if (message) {
      addToast(message, {
        appearance: isSuccess ? "success" : "error",
      });
    }
  }, [isSuccess, message, addToast]);

  const handleSearch = async (willSearch, key) => {
    if (willSearch) {
      setBudgets(globalSearch(budgets, key));
    } else {
      setBudgets(collections.filter(e => e.deleted === false));
    }
  };

  return (
    <>
      <DataTable
        isLoading={isLoading}
        title="Active Budgets"
        array={budgets}
        actions={[
          {
            _title: "Add new",
            _icon: "plus",
            _function: handleCreate,
            _condition: () => !isActive,
            _shouldReset: true,
            _disabledOnSearch: true,
          },
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
          {
            _title: "Archive",
            _icon: "trash",
            _function: handleDestroy,
            _condition: () => !isActive,
            _haveSelect: true,
            _shouldReset: true,
          },
        ]}
        tableHeads={[
          {
            _text: "Name",
          },
          {
            _text: "Amount",
          },
          {
            _text: "Start",
          },
          {
            _text: "End",
          },
        ]}
        tableBodies={[
          {
            _key: "name",
          },
          {
            _key: "amount",
            _format: data => formatCurrency(data),
          },
          {
            _key: "start",
            _format: data => new Date(data).toLocaleString(),
          },
          {
            _key: "end",
            _format: data => new Date(data).toLocaleString(),
          },
        ]}
        disableSearch={isActive}
        handleSearch={handleSearch}
        toggleComponent={isActive}
        customComponent={<ReactCalendar handleUpdate={handleUpdate} />}
      />
      <Modal
        key={selected._id || "event-initial-create"}
        selected={selected}
        willCreate={willCreate}
        show={showModal}
        toggle={toggleModal}
      />
      {auth?.role?.name === "VIP" && <Bots promt="budgets" />}
    </>
  );
}
