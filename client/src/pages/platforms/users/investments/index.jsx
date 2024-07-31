import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DESTROY,
  FIND,
  RESET,
  UPDATE,
} from "../../../../services/redux/slices/investments";
import { useToasts } from "react-toast-notifications";
import Modal from "./modal";
import DataTable from "../../../../components/dataTable";
import { globalSearch } from "../../../../services/utilities";
import Swal from "sweetalert2";
import formatCurrency from "../../../../services/utilities/formatCurrency";
import { MDBIcon } from "mdbreact";
import Bots from "../bots";

export default function Investments() {
  const [investments, setInvestments] = useState([]),
    isActive = true,
    [selected, setSelected] = useState({}),
    [showModal, setShowModal] = useState(false),
    [willCreate, setWillCreate] = useState(true),
    { token, auth } = useSelector(({ auth }) => auth),
    { collections, message, isSuccess, isLoading, total } = useSelector(
      ({ investments }) => investments
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
    setInvestments(collections.filter(e => e.deleted === !isActive));
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
      text: `You are about to restore ${selected.length} Investment(s).`,
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
      text: `You are about to permanently delete ${selected.length} Budget(s).`,
      icon: "warning",
      confirmButtonText: "Proceed",
      cancelButtonColor: "#d33",
      showCancelButton: true,
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
      setInvestments(globalSearch(collections, key));
    } else {
      setInvestments(collections);
    }
  };

  return (
    <>
      <DataTable
        isLoading={isLoading}
        title={`${
          isActive ? "Active" : "Deleted"
        } Investments Total investment (${formatCurrency(total)})`}
        array={investments}
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
            _condition: () => isActive,
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
            _text: "For",
          },
          {
            _text: "Type",
          },
          {
            _text: "Amount",
          },
          {
            _text: "Return",
          },
        ]}
        tableBodies={[
          {
            _key: "name",
          },
          {
            _key: "type",
          },
          {
            _key: "amount",
            _format: data => formatCurrency(data),
          },
          {
            _key: "return",
            _format: (data, item) => {
              if (item.amount >= data) {
                return (
                  <p className="text-danger">
                    <MDBIcon icon="sort-down" /> {formatCurrency(data)}
                  </p>
                );
              } else {
                return (
                  <p className="text-success">
                    <MDBIcon icon="sort-up" /> {formatCurrency(data)}
                  </p>
                );
              }
            },
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
      {auth?.role?.name === "VIP" && <Bots promt="investments" />}
    </>
  );
}
