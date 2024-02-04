import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TodoItem.css";

const TodoItem = (props) => {
  const { Item = { title: "제목", memo: "메모", id: 0, complete: false } } =
    props;

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(Item.title);
  const [memo, setMemo] = useState(Item.memo);
  const [date, setDate] = useState(Item.date);
  const [complete, setComplete] = useState(Item.complete);

  const style = {
    border: "1px solid black",
    borderRadius: "5px",
    padding: "8px",
    margin: "8px",
  };

  const handleRemove = () => {
    let chk = confirm("정말 삭제하시겠습니까?");
    if (chk) {
      props.onRemove(Item.id);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "memo") {
      setMemo(e.target.value);
    }
  };

  const handleUpdate = () => {
    setEditing(!editing);
  };

  const handleToggle = () => {
    setComplete(!complete);
    props.onUpdate(id, { complete: !complete });
  };

  const handleComplete = () => {
    let chk = false;
    if (complete) {
      chk = confirm("완료 취소 처리 하시겠습니까?");
    } else {
      chk = confirm("완료 처리 하시겠습니까?");
    }

    if (chk) {
      setComplete(!complete);
      props.onComplete(Item.id, !complete);
    }
  };

  useEffect(() => {
    if (editing) {
      setTitle(Item.title);
      setMemo(Item.memo);
    } else if (!editing && (title || memo)) {
      props.onUpdate(Item.id, { title, memo });
    }
  }, [editing]);

  if (editing) {
    return (
      <div style={style} className="w-100">
        <input
          className="form-control"
          value={title}
          name="title"
          placeholder="제목"
          onChange={handleChange}
        />

        <div>
          <textarea
            rows="6"
            className="mt-2 mb-2 form-control"
            value={memo}
            name="memo"
            placeholder="메모"
            onChange={handleChange}
          />
        </div>
        <button
          className="btn btn-outline-success w-100"
          onClick={handleUpdate}
        >
          적용
        </button>
      </div>
    );
  }

  return (
    <div
      style={style}
      className={
        complete
          ? "completed w-100 align-items-center flex-column hoverArea"
          : "w-100 align-items-center flex-column hoverArea"
      }
    >
      <div className="hiddenContent">
        <div className="d-flex justify-content-center text-center h-100">
          <div className="col-6">
            <div
              onClick={handleComplete}
              className="text-bg-success w-100 h-100"
            >
              <span className="fw-bold" text>
                {complete ? "취소" : "완료"}
              </span>
            </div>
          </div>

          <div className="col-6">
            <div className="align-items-cetner flex-column w-100 h-100">
              {!complete && (
                <div className="w-100 h-100">
                  <div
                    onClick={handleUpdate}
                    className="text-bg-secondary w-100 h-100"
                  >
                    <span className="fw-bold">수정</span>
                  </div>
                </div>
              )}

              <div className="w-100 h-100">
                <div
                  onClick={handleRemove}
                  className="text-bg-danger w-100 h-100"
                >
                  <span className="fw-bold">삭제</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <div className="col-9">
          <b className="ms-1">{title}</b>
        </div>
        <div className="col-3">
          <span>{date}</span>
        </div>
      </div>

      <div className="mt-2 mb-2 ms-1">{memo}</div>
    </div>
  );
};
export default TodoItem;
