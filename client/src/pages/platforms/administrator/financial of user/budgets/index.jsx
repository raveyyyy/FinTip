import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DESTROY,
  RESET,
  UPDATE,
  BROWSE,
} from "../../../../../services/redux/slices/budgets";
import { useToasts } from "react-toast-notifications";
import Modal from "./modal";
import DataTable from "../../../../../components/dataTable";
import { fullName, globalSearch } from "../../../../../services/utilities";
import Swal from "sweetalert2";
import formatCurrency from "../../../../../services/utilities/formatCurrency";

export default function Budgets() {
  const [budgets, setBudgets] = useState([]),
    [isActive, setIsActive] = useState(true),
    [selected, setSelected] = useState({}),
    [showModal, setShowModal] = useState(false),
    [willCreate, setWillCreate] = useState(true),
    { token, auth } = useSelector(({ auth }) => auth),
    { collections, message, isSuccess, isLoading } = useSelector(
      ({ budgets }) => budgets
    ),
    { addToast } = useToasts(),
    dispatch = useDispatch();

  const handleSwitch = () => setIsActive(!isActive);
  useEffect(() => {
    if (token) {
      dispatch(BROWSE(token));
    }

    return () => dispatch(RESET());
  }, [token, auth, dispatch]);

  useEffect(() => {
    setBudgets(collections.filter(e => e.deleted === !isActive));
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
      text: `You are about to restore ${selected.length} Budget(s).`,
      icon: "question",
      confirmButtonText: "Proceed",
    }).then(res => {
      if (res.isConfirmed) {
        const toRestore = selected.map(item => ({
          amount: item.amount,
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
      text: `You are about to delete ${selected.length} Budget(s).`,
      icon: "question",
      inputPlaceholder: "Please specify a reason",
      confirmButtonText: "Proceed",
    });

    if (reason) {
      const toDelete = selected.map(item => ({
        _id: item._id,
        amount: item.amount,
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
      const items = await collections.filter(e => e.deleted === !isActive);
      setBudgets(globalSearch(items, key));
    } else {
      setBudgets(collections);
    }
  };

  return (
    <>
      <DataTable
        isLoading={isLoading}
        title={`${isActive ? "Active" : "Deleted"} Budgets `}
        array={budgets}
        actions={[
          {
            _icon: "sync",
            _function: handleSwitch,
            _shouldReset: true,
            _disabledOnSearch: true,
          },
          {
            _icon: "plus",
            _function: handleCreate,
            _disabledOnSearch: true,
            _condition: () => isActive,
          },
          {
            _icon: isActive ? "pen" : "undo-alt",
            _function: isActive ? handleUpdate : handleRestore,
            _haveSelect: true,
            _allowMultiple: !isActive,
            _shouldReset: true,
          },
          {
            _icon: "trash",
            _function: handleDestroy,
            _condition: () => isActive,
            _haveSelect: true,
            _shouldReset: true,
          },
        ]}
        tableHeads={[
          {
            _text: "User Fullname",
          },
          {
            _text: "For",
          },
          {
            _text: "Amount",
          },
        ]}
        tableBodies={[
          {
            _key: "user",
            _format: data => fullName(data.fullName),
          },
          {
            _key: "name",
          },
          {
            _key: "amount",
            _format: data => formatCurrency(data),
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
    </>
  );
}
