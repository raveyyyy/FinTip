import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DESTROY,
  FIND,
  RESET,
  UPDATE,
} from "../../../../services/redux/slices/savings";
import { useToasts } from "react-toast-notifications";
import Modal from "./modal";
import DataTable from "../../../../components/dataTable";
import { globalSearch } from "../../../../services/utilities";
import Swal from "sweetalert2";
import formatCurrency from "../../../../services/utilities/formatCurrency";
import moment from "moment";
import Bots from "../bots";

export default function Savings() {
  const [savings, setSavings] = useState([]),
    isActive = true,
    [selected, setSelected] = useState({}),
    [showModal, setShowModal] = useState(false),
    [willCreate, setWillCreate] = useState(true),
    { token, auth } = useSelector(({ auth }) => auth),
    { collections, message, isSuccess, isLoading, total } = useSelector(
      ({ savings }) => savings
    ),
    { addToast } = useToasts(),
    dispatch = useDispatch();

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

    return () => dispatch(RESET());
  }, [token, auth, dispatch]);

  useEffect(() => {
    setSavings(collections.filter(e => e.deleted === !isActive));
  }, [isActive, collections]);

  const toggleModal = () => setShowModal(!showModal);

  const handleUpdate = selected => {
    setSelected(selected);
    if (willCreate) {
      setWillCreate(false);
    }
    setShowModal(true);
  };

  const handleCreate = () => {
    if (!willCreate) {
      setWillCreate(true);
    }
    setShowModal(true);
  };

  const handleRestore = selected =>
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to restore ${selected.length} Saving(s).`,
      icon: "question",
      confirmButtonText: "Proceed",
    }).then(res => {
      if (res.isConfirmed) {
        const toRestore = selected.map(item => ({
          balance: item.balance,
          _id: item._id,
          deleted: false,
        }));

        dispatch(
          UPDATE({
            data: toRestore.length > 1 ? toRestore : toRestore[0],
            token,
          })
        );
      }
    });

  const handleDestroy = async selected => {
    const { value: reason } = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to permanently delete ${selected.length} Budget(s).`,
      icon: "warning",
      confirmButtonText: "Proceed",
      cancelButtonColor: "#d33",
      showCancelButton: true,
    });

    if (reason) {
      const toDelete = selected.map(item => ({
        _id: item._id,
        balance: item.balance,
        deleted: true,
      }));

      dispatch(
        DESTROY({
          data: toDelete.length > 1 ? toDelete : toDelete[0],
          token,
        })
      );
    }
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
      setSavings(globalSearch(collections, key));
    } else {
      setSavings(collections);
    }
  };

  return (
    <>
      <DataTable
        isLoading={isLoading}
        title={`${
          isActive ? "Active" : "Deleted"
        } Savings Total  (${formatCurrency(total)})`}
        array={savings}
        actions={[
          {
            _title: "Add new",
            _icon: "plus",
            _function: handleCreate,
            _condition: () => isActive,
            _shouldReset: true,
            _disabledOnSearch: true,
          },
          {
            _title: isActive ? "Edit selected" : "Restore selected",
            _icon: isActive ? "pen" : "undo-alt",
            _function: isActive ? handleUpdate : handleRestore,
            _haveSelect: true,
            _allowMultiple: false,
            _shouldReset: true,
          },
          {
            _title: "Archive",
            _icon: "trash",
            _function: handleDestroy,
            _condition: () => isActive,
            _haveSelect: true,
            _shouldReset: true,
          },
        ]}
        tableHeads={[
          {
            _text: "Account Name",
          },
          {
            _text: "Deposited",
          },
          {
            _text: "Total Increase",
          },
          {
            _text: "Increase",
          },
          {
            _text: "Per",
          },
          {
            _text: "Start",
          },
        ]}
        tableBodies={[
          {
            _key: "name",
          },
          {
            _key: "balance",
            _format: data => formatCurrency(data),
          },
          {
            _key: "increase",
            _format: (data, item) => {
              var a = moment(item.start);
              var b = moment(new Date());
              const year = b.diff(a, item.isMonthly ? "months" : "years");
              const increase = (data / 100) * year * item.balance;
              return formatCurrency(increase);
            },
          },
          {
            _key: "increase",
          },
          {
            _key: "isMonthly",
            _format: data => (data ? "Monthly" : "Annualy"),
          },
          {
            _key: "start",
            _format: data => new Date(data).toLocaleString(),
          },
        ]}
        handleSearch={handleSearch}
      />
      <Modal
        selected={selected}
        willCreate={willCreate}
        show={showModal}
        toggle={toggleModal}
      />
      {auth?.role?.name === "VIP" && <Bots promt="savings" />}
    </>
  );
}
