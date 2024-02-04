import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LogItem = (props) => {
  const { Item = { log: "제목", target: "메모" } } = props;

  const [log, setLog] = useState(Item.log);
  const [target, setTarget] = useState(Item.target);
  const [date, setDate] = useState(new Date().toLocaleTimeString());

  return (
    <div className="w-100 mt-1 ms-3">
      <div className="align-items-center flex-column">
        <div className="d-flex justify-content-center">
          <div className="col-9">
            <small className="fw-bold">{target}</small>
          </div>
          <div className="col-3">
            <small>{log}</small>
          </div>
        </div>
        <div>
          <small>{date}</small>
        </div>
      </div>
    </div>
  );
};

export default LogItem;
