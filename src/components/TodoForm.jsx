import React, { useState } from "react";

const TodoForm = (props) => {
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [date, setDate] = useState(new Date().toLocaleTimeString());
  const [complete, setComplete] = useState(false);

  const style = {
    resize: "none",
  };

  const handleChange = (e) => {
    if (e.target.name == "title") {
      setTitle(e.target.value);
    } else if (e.target.name == "memo") {
      setMemo(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //페이지 새로고침 방지
    if (title && memo) {
      const now = new Date();
      const currentTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setDate(currentTime);

      props.onCreate({ title, memo, date: currentTime, complete });

      setTitle("");
      setMemo("");
    } else {
      alert("제목과 메모를 입력해주세요.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="form-control m-2 mb-0 w-100"
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={handleChange}
        name="title"
      />
      <br />
      <textarea
        className="form-control m-2 mt-0 mb-0 w-100"
        style={style}
        rows="6"
        placeholder="메모를 입력해주세요."
        value={memo}
        onChange={handleChange}
        name="memo"
      />
      <br />
      <button
        type="submit"
        className="btn btn-outline-dark w-100 m-2 mt-0 mb-2"
      >
        등록
      </button>
    </form>
  );
};

export default TodoForm;
