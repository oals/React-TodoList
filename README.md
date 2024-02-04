# React-TodoList
TodoList 리엑트 웹 사이트 개인 프로젝트

# 소개
리엑트를 사용해 TodoList를 만들어보았습니다.


# 제작기간 & 참여 인원
<UL>
  <LI>2023.01.31 ~ 2023.02.04</LI>
  <LI>개인 프로젝트</LI>
</UL>


# 사용기술
![React](https://img.shields.io/badge/React-0769Ac?style=for-the-badge&logo=React&logoColor=white)
![js](https://img.shields.io/badge/Replit-8D0000?style=for-the-badge&logo=Replit&logoColor=white)



# 컴포넌트 소스코드



<details>
 <summary> App.jsx
 
 </summary> 
 




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






</details>







<details>
 <summary> TodoForm.jsx
 
 </summary> 
 




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



 


</details>








<details>
 <summary> TodoItem.jsx
 
 </summary> 

 

        
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



 


</details>








<details>
 <summary>TodoItemList.jsx 
 
 </summary> 
 




       import React from "react";
      import TodoItem from "./TodoItem";
      
      const TodoItemList = (props) => {
        const list = props.data.map((Item) => (
          <TodoItem
            key={Item.id}
            Item={Item}
            onComplete={props.onComplete}
            onRemove={props.onRemove}
            onUpdate={props.onUpdate}
          />
        ));
      
        return <div>{list}</div>;
      };
      
      export default TodoItemList;
      






</details>








<details>
 <summary> LogItem.jsx
 
 </summary> 






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




 
 


</details>







<details>
 <summary> LogItemList.jsx
 
 </summary> 




      import React from "react";
      import LogItem from "./LogItem";
      
      const LogItemList = (props) => {
        const list = props.data.map((Item) => <LogItem Item={Item} />);
      
        return <div>{list}</div>;
      };
      
      export default LogItemList;



 
 


</details>












# 핵심 기능 및 페이지 소개

<br>


<h3>할 일 등록</h3>
<br>


![등록](https://github.com/oals/React-TodoList/assets/136543676/946eead6-695a-4ba1-a50b-a83d9f20bb5e)



<br>
<br>




<UL>
  <LI>오늘 할 일을 기록 할 수 있습니다.</LI>
  <Li>등록 로그 기록을 남기도록 구현했습니다.</Li>
</UL>


<br>
<br>


<h3> 수정 </h3>
<br>


![수정](https://github.com/oals/React-TodoList/assets/136543676/d7a9d36f-ff48-4f1a-92f0-6ac15c976111)



<br>
<br>




<UL>
  <LI>등록된 할 일 요소를 선택해 수정을 할 수 있습니다. </LI>
  <LI>수정 시 로그 기록을 남기도록 구현했습니다.</LI>


</UL>


<br>
<br>

<h3>완료 / 완료 취소</h3>
<br>


![완료-완료취소](https://github.com/oals/React-TodoList/assets/136543676/2ab182b5-67e1-49f9-9a15-4622ca6aeab0)



<br>
<br>



<UL>
  <LI>등록된 할 일을 완료 처리 할 수 있습니다. </LI>
  <LI>완료 처리 된 할 일을 취소 할 수 있습니다.</LI>
  <Li>완료 혹은 완료 취소 로그 기록을 남기도록 구현했습니다.</Li>


</UL>


<br>
<br>


<h3>삭제 </h3>
<br>


![삭제-전체삭제](https://github.com/oals/React-TodoList/assets/136543676/cf921d6c-8a25-4ab1-968d-4a970777368a)



<br>
<br>



<UL>
  <LI>등록된 할 일을 삭제 혹은 전체 삭제 할 수 있습니다</LI>
  <LI>삭제 혹은 전체 삭제 로그 기록을 남기도록 구현했습니다.</li>

</UL>


<br>
<br>





# 프로젝트를 통해 느낀 점과 소감


처음으로 리엑트를 사용해봤다. <br>
리스트를 만들고 뿌려주는 방식이 뭔가 안드로이드랑 비슷하다는 느낌을 받았다 <br>
리엑트를 처음 시작했을 때 어떤 흐름인지 이해가 잘 안됐었는데 공부 하다보니 생각보다 간단하다고 느꼈던 것 같다<br>
물론 아직 잘 모른다..
















