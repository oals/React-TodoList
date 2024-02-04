import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItemList from "./components/TodoItemList";
import LogItemList from "./logComponents/LogItemList";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const id = useRef(1);
  const isCreating = useRef(true); // useRef를 사용하여 플래그 생성

  const [logList, setLogList] = useState([
    {
      target: "접속",
    },
  ]);

  const [todoList, setTodoList] = useState([]);

  const handleCreate = (data) => {
    isCreating.current = true; // 할 일을 생성하는 중임을 표시
    setTodoList(todoList.concat({ id: id.current++, ...data }));
    logCreate({ log: "할 일 등록", target: data.title });
  };

  useEffect(() => {
    isCreating.current = false;
  }, [todoList]);

  const logCreate = (data) => {
    setLogList(logList.concat({ ...data }));
  };
  const handleUpdate = (id, data) => {
    const itemToUpdate = todoList.find((item) => item.id === id);
    if (itemToUpdate) {
      if (!isCreating.current) {
        logCreate({
          log: "할 일 수정",
          target: itemToUpdate.title,
        });
      }
      setTodoList(
        todoList.map((item) => (id === item.id ? { ...item, ...data } : item)),
      );
    }
  };

  const handleRemove = (id) => {
    const itemToRemove = todoList.find((item) => item.id === id);
    if (itemToRemove) {
      logCreate({
        log: "할 일 삭제",
        target: itemToRemove.title,
      });
      setTodoList(todoList.filter((item) => item.id !== id));
    }
  };

  const AllHandleRemove = () => {
    if (todoList.length != 0) {
      let chk = confirm("정말 삭제하시겠습니까?");
      if (chk) {
        setTodoList([]);
        logCreate({ log: "전체 삭제", target: "전체" });
      }
    } else {
      alert("삭제할 내용이 없습니다.");
    }
  };

  const handleComplete = (id, chk) => {
    handleUpdate(id, { complete: true });
    const completedItem = todoList.find((item) => item.id === id);
    if (completedItem) {
      if (chk) {
        logCreate({
          log: "할 일 완료",
          target: completedItem.title,
        });
      } else {
        logCreate({
          log: "완료 취소",
          target: completedItem.title,
        });
      }
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center title">ToDo</h3>
      <hr />
      <div className="d-flex justify-content-center">
        <div className="col-2" />

        <div className="col-4">
          <div className="align-items-center flex-column">
            <div>
              <TodoForm onCreate={handleCreate} />
              <button
                type="button"
                onClick={AllHandleRemove}
                className="btn btn-outline-danger w-100 m-2 mt-0 mb-2"
              >
                전체 삭제
              </button>
            </div>
            <hr />
            <div className="log-scroll">
              <LogItemList data={logList} onLogCreate={logCreate} />
            </div>
          </div>
        </div>
        <div className="col-1" />
        <div className="col-4 scroll">
          {todoList.length === 0 ? (
            <div>
              <div className="text-center mt-2 fw-bold">
                할 일을 등록해보세요.
              </div>
              <hr />
            </div>
          ) : (
            <TodoItemList
              data={todoList}
              onComplete={handleComplete}
              onRemove={handleRemove}
              onUpdate={handleUpdate}
            />
          )}
        </div>
        <hr />

        <div className="col-1" />
      </div>
    </div>
  );
}
