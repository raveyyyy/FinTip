import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { MDBBtn, MDBSpinner, MDBStepper } from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { BOT } from "../../../../services/redux/slices/statistics";
import { PresetImage } from "../../../../services/utilities";
import {
  DESTROY,
  FIND,
  RESET,
  SAVE,
} from "../../../../services/redux/slices/chats";
import Swal from "sweetalert2";
export default function Bots({ promt }) {
  const { advice } = useSelector(({ statistics }) => statistics),
    loading = useSelector(({ statistics }) => statistics.isLoading),
    { collections, isLoading } = useSelector(({ chats }) => chats),
    { token, auth, image } = useSelector(({ auth }) => auth),
    [account, setAccount] = useState({}),
    [chats, setChats] = useState([]),
    [question, setQuestion] = useState(""),
    div = useRef(null),
    dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(
        FIND({
          token,
          key: {
            user: `{"$eq": "${auth._id}"}`,
            tab: `{"$eq": "${promt ? promt : ""}"}`,
          },
        })
      );
    }

    return () => {
      dispatch(RESET());
    };
  }, [token, auth, advice, dispatch, promt]);

  useEffect(() => {
    setAccount(auth);
  }, [auth]);

  useEffect(() => {
    setChats(collections.filter(e => e.deleted === false));
  }, [collections]);

  useEffect(() => {
    div.current.scroll(
      0,
      document.getElementById("chat-content").scrollHeight + 1000
    );
  }, [chats]);

  const handleGenerate = () => {
    if (promt) {
      dispatch(
        SAVE({
          data: {
            question: `Base on my ${promt} generate tips and recommendations`,
            tab: promt,
            user: account._id,
            _id: account._id,
          },
          token,
        })
      );
    } else {
      dispatch(
        BOT({
          token,
          key: {
            user: `{"$eq": "${auth._id}"}`,
          },
        })
      );
    }
  };

  const handleClear = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to permanently delete ${chats.length} Chats(s).`,
      icon: "warning",
      confirmButtonText: "Proceed",
      cancelButtonColor: "#d33",
      showCancelButton: true,
    }).then(res => {
      if (res.isConfirmed) {
        const toDestroy = chats.map(item => ({
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
  };

  const handleSend = async () => {
    await setChats([...chats, { question, user: account._id }]);
    dispatch(
      SAVE({
        data: {
          tab: promt ? promt : "",
          question,
          user: account._id,
          _id: account._id,
        },
        token,
      })
    );
    setQuestion("");
    div.current.scroll(
      0,
      document.getElementById("chat-content").scrollHeight + 1000
    );
  };

  return (
    <div className="container" style={{ width: "100vw" }}>
      <div className="container d-flex justify-content-center">
        <div className="col-md-12">
          <div className="card card-bordered">
            <div
              ref={div}
              // className="ps-container ps-theme-default ps-active-y"
              id="chat-content"
              style={{
                overflow: "scroll",
                height: "50vh ",
              }}
            >
              {chats.map(chat => {
                return (
                  <>
                    {chat.question && (
                      <div className="media media-chat media-chat">
                        <img
                          src={image}
                          onError={e =>
                            (e.target.src = PresetImage(account.isMale))
                          }
                          className="avatar"
                          alt="..."
                        />
                        <div className="media-body">
                          <p>{chat.question}</p>
                        </div>
                      </div>
                    )}
                    {chat.answer && (
                      <div className="media media-chat media-chat-reverse">
                        <img
                          className="avatar"
                          src="https://img.icons8.com/color/36/000000/administrator-male.png"
                          alt="..."
                        />
                        <div className="media-body">
                          <p>{chat.answer}</p>
                        </div>
                      </div>
                    )}
                  </>
                );
              })}
              {isLoading && (
                <div className="media media-chat media-chat-reverse">
                  <img
                    className="avatar"
                    src="https://img.icons8.com/color/36/000000/administrator-male.png"
                    alt="..."
                  />
                  <div className="media-body">
                    <p>
                      <MDBStepper multicolor />
                    </p>
                  </div>
                </div>
              )}
              {!promt && (
                <div className="w-100  d-flex align-items-center justify-content-center">
                  <span
                    className="p-2 mx-2 bg-success  rounded"
                    onClick={() =>
                      setQuestion(
                        "Base on my budgets generate tips and recommendations"
                      )
                    }
                  >
                    Base on my budgets
                  </span>
                  <span
                    className="p-2 mx-2 bg-success  rounded"
                    onClick={() =>
                      setQuestion(
                        "Base on my expenses generate tips and recommendations"
                      )
                    }
                  >
                    Base on my expenses
                  </span>
                  <span
                    className="p-2 mx-2 bg-success  rounded"
                    onClick={() =>
                      setQuestion(
                        "Base on my investments generate tips and recommendations"
                      )
                    }
                  >
                    Base on my investments
                  </span>
                  <span
                    className="p-2 mx-2 bg-success  rounded"
                    onClick={() =>
                      setQuestion(
                        "Base on my savings generate tips and recommendations"
                      )
                    }
                  >
                    Base on my savings
                  </span>
                  <span
                    className="p-2 mx-2 bg-success  rounded"
                    onClick={() =>
                      setQuestion(
                        "Base on my financial goal generate tips and recommendations"
                      )
                    }
                  >
                    Base on my financial goal
                  </span>
                </div>
              )}
              <div className="ps-scrollbar-x-rail">
                <div className="ps-scrollbar-x" tabindex="0"></div>
              </div>
              <div
                className="ps-scrollbar-y-rail"
                style={{ top: "0px", height: "0px", right: "2px" }}
              >
                <div
                  className="ps-scrollbar-y"
                  tabindex="0"
                  style={{ top: "0px", height: "2px" }}
                ></div>
              </div>
            </div>
            <div
              className="ps-scrollbar-x-rail"
              style={{ left: "0px", bottom: "0px" }}
            >
              <div
                className="ps-scrollbar-x"
                tabindex="0"
                style={{ left: "0px", width: "0px" }}
              ></div>
            </div>
            <div
              className="ps-scrollbar-y-rail"
              style={{ top: "0px", height: "0px", right: "2px" }}
            >
              <div
                className="ps-scrollbar-y"
                tabindex="0"
                style={{ top: "0px", height: "2px" }}
              ></div>
            </div>

            {!promt && (
              <div className="publisher bt-1 border-light">
                <img
                  className="avatar avatar-xs"
                  src={image}
                  onError={e => (e.target.src = PresetImage(account.isMale))}
                  alt="..."
                />
                <input
                  className="publisher-input"
                  type="text"
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                  placeholder="Write something"
                />
                {isLoading || loading ? (
                  <MDBSpinner />
                ) : (
                  <button
                    onClick={handleSend}
                    className="publisher-btn text-info"
                    data-abc="true"
                  >
                    <i className="fa fa-paper-plane"></i>
                  </button>
                )}
              </div>
            )}

            <div className="publisher bt-1 border-light d-flex align-items-center justify-content-center">
              {isLoading || loading ? (
                <MDBSpinner />
              ) : (
                <>
                  <MDBBtn onClick={handleGenerate} size="2x" color="success">
                    Generate
                  </MDBBtn>
                  <MDBBtn onClick={handleClear} size="2x" color="danger">
                    Clear
                  </MDBBtn>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
